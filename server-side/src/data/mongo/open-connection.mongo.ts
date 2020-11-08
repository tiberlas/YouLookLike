import { MongoClient } from 'mongodb';
import { mongoConfig } from '../../config';
import { displayError } from '../../common/err-log';
import { ERROR_CODES } from '../../error/error-codes';

const url: string = mongoConfig.MONGODB;
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export class OpenConnectionMongo {

	registeredUserCollection: string;
	userRequestCollection: string;

	constructor() {
		this.registeredUserCollection = mongoConfig.COLLECTIONS[1];
		this.userRequestCollection = mongoConfig.COLLECTIONS[0];
	}

	mongodb = (): Promise<MongoClient> => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(url, mongoOptions, (err, client) => {
				if (err) {
					displayError(__filename, 'OpenConnectionMongo', err);
					reject(ERROR_CODES.DB_NOT_CONNECTED);
				} else {
					resolve(client);
				}
			});
		});
	};
}