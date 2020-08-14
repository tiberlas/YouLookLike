import { MongoClient } from 'mongodb';
import { config } from '../config';
import { UserData } from './user.data';
import { UserModel } from './user.model';

const url: string = config.MONGODB;
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const collectionName: string = 'users';
var mongoClient: MongoClient;

export class UserDataMongo implements UserData {
	private monogdb = () => {
		return new Promise((resolve, reject) => {
			MongoClient.connect(url, mongoOptions, (err, client) => {
				if (err) {
					console.log('MONGO DB ERROR: ', err);
					reject(err);
				} else {
					mongoClient = client;
					resolve();
				}
			});
		});
	};

	printAll(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.monogdb()
				.then(() => {
					mongoClient
						.db()
						.collection(collectionName)
						.find()
						.toArray((err: any, res: any) => {
							if (err) throw err;
							console.table(res);

							mongoClient.close();
							resolve();
						});
				})
				.catch((err) => reject(err));
		});
	}

	getAll(): Promise<UserModel[]> {
		return new Promise((resolve, reject) => {
			this.monogdb()
				.then(() => {
					mongoClient
						.db()
						.collection(collectionName)
						.find()
						.toArray((err: any, doqu: any) => {
							mongoClient.close();
							resolve(doqu);
						});
				})
				.catch((err) => reject(err));
		});
	}

	getById(id: string): Promise<UserModel> {
		return new Promise((resolve, reject) => {
			this.monogdb()
				.then(() => {
					mongoClient
						.db()
						.collection(collectionName)
						.find({ _id: id })
						.toArray((err: any, doqu: any) => {
							mongoClient.close();
							resolve(doqu);
						});
				})
				.catch((err) => reject(err));
		});
	}

	createUser(newUser: UserModel): Promise<string> {
		return new Promise((resolve, reject) => {
			delete newUser._id;
			this.monogdb()
				.then(() => {
					mongoClient
						.db()
						.collection(collectionName)
						.insertOne(newUser);
				})
				.then(() => {
					mongoClient
						.db()
						.collection(collectionName)
						.findOne(newUser, (err: any, doqu: any) => {
							mongoClient.close();
							if (err) {
								reject(err);
							} else {
								resolve(doqu._id);
							}
						});
				})
				.catch((err) => reject(err));
		});
	}

	updateUser(user: UserModel): Promise<string> {
		const id: string = user._id;
		delete user._id;
		return new Promise((resolve, reject) => {
			this.monogdb()
				.then(() => {
					mongoClient
						.db()
						.collection(collectionName)
						.updateOne({ _id: id }, user, (err, doqu) => {
							mongoClient.close();
							if (err) {
								reject(err);
							} else {
								resolve(id);
							}
						});
				})
				.catch((err) => reject(err));
		});
	}

	deleteUser(id: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.monogdb()
				.then(() => {
					mongoClient
						.db()
						.collection(collectionName)
						.deleteOne({ _id: id })
						.then(() => {
							mongoClient.close();
							resolve(true);
						});
				})
				.catch((err) => reject(err));
		});
	}
}
