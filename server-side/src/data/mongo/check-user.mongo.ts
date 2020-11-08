import { MongoClient } from 'mongodb';
import { CheckUserData } from '../interfaces/check-user.data';
import { OpenConnectionMongo } from './open-connection.mongo';
import { displayError } from '../../common/err-log';

export class CheckUserMongo extends OpenConnectionMongo implements CheckUserData {

	existEmail(email: string): Promise<boolean> {
		return this.existField('email', email, 'existEmail');
	}

	existUserName(userName: string): Promise<boolean> {
		return this.existField('userName', userName, 'existUserName');
	}

	private existField(field: string, value: string, funName: string): Promise<boolean> {
		const userCollections: string[] = [
			this.registeredUserCollection,
			this.userRequestCollection
		];
		let exist: boolean = false;
		const findCriteria: any = { isDeleted: false };
		findCriteria[field] = value;

		return new Promise(async (resolve, reject) => {
			try {
				const mongoClient: MongoClient = await this.mongodb();
				for (let i = 0; i < 2; ++i) {
					let document = await mongoClient.db().collection(userCollections[i]).findOne(findCriteria);
					if (document) { exist = true; break; }
				}
				mongoClient.close();
				resolve(exist);
			} catch (err) {
				displayError(__filename, funName, err);
				reject(err);
			}
		});
	}
};