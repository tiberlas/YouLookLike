import chai from 'chai';
import {UserDataMongo} from '../../src/user/user.data.mongo';
import { UserModel, ROLE } from '../../src/user/user.model';

const assert: Chai.Assert = chai.assert;

describe('Mongo data base', () => {
	let mongo: UserDataMongo;
	before(() => {
		mongo = new UserDataMongo();
	});

	it('test connection', async() => {
		
		try {

			await mongo.printAll();
			assert.isTrue(true);
		} catch(err) {
			assert.isTrue(false);
			throw err;
		}
	});

	it('test insertion', async () => {
		const newUser: UserModel = new UserModel('user one', 'email@email', 'password', ROLE.USER);

		try {

			const totalBefore:number = (await mongo.getAll()).length;
			let id:string = await mongo.createUser(newUser);
			const totalAfter:number = (await mongo.getAll()).length;

			assert.equal(totalAfter, totalBefore + 1);

			await mongo.deleteUser(id);
		} catch(err) {
			assert.isTrue(false);
			throw err;
		}
	});
});