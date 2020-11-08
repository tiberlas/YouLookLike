import { MongoClient } from "mongodb";
import { displayError } from "../../common/err-log";
import { isEmptyString, validate } from "../../common/validate-user";
import { ERROR_CODES } from "../../error/error-codes";
import { PERMISSIONS } from "../../model/permissions.model";
import { RegisteredUser } from "../../model/registered-user.model";
import { RegisteredUserData } from "../interfaces/registered-user.data";
import { OpenConnectionMongo } from "./open-connection.mongo";

export class RegisteredUserMongo
	extends OpenConnectionMongo
	implements RegisteredUserData {

	printAllRegistered(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			try {
				const mongoClient: MongoClient = await this.mongodb();
				const document = await mongoClient
					.db()
					.collection(this.registeredUserCollection)
					.find()
					.toArray();

				console.table(document);
				mongoClient.close();
				resolve();
			} catch (err) {
				displayError(__filename, 'printAllRegistered', err);
				reject(err);
			}
		});
	}

	getAllRegisteredByPermissionsAndIsDeleted(
		permissions: PERMISSIONS[] | null,
		isDeleted: boolean | null
	): Promise<RegisteredUser[]> {

		const findConditions: any = {};

		permissions != null && permissions != undefined ?
			findConditions['permissions'] = permissions : undefined;

		isDeleted != null && isDeleted != undefined ?
			findConditions['isDeleted'] = isDeleted : undefined;

		return new Promise(async (resolve, reject) => {
			try {
				const mongoClient: MongoClient = await this.mongodb();
				const document = await mongoClient
					.db()
					.collection(this.registeredUserCollection)
					.find(findConditions)
					.toArray();

				mongoClient.close();
				const users = document.map(item => {
					delete item._id;
					return item;
				});
				resolve(users);
			} catch (err) {
				displayError(
					__filename,
					'getAllRegisteredByPermissionsAndIsDeleted',
					err);

				reject(err);
			}
		});
	}

	getByUserId(userId: string): Promise<RegisteredUser> {
		return new Promise(async (resolve, reject) => {
			if (isEmptyString(userId)) {
				throw ERROR_CODES.USER_ID_NOT_VALID;
			}

			try {
				const mongoClient: MongoClient = await this.mongodb();
				const user = await mongoClient
					.db()
					.collection(this.registeredUserCollection)
					.findOne({ userId: userId });

				mongoClient.close();
				delete user._id;
				resolve(user);
			} catch (err) {
				displayError(__filename, 'getByUserId', err);
				reject(err);
			}
		});
	}

	getByFields(fields: any): Promise<RegisteredUser> {
		/**
		 * example fields = { email: 'test@email.com', userName: 'test'}
		 */
		return new Promise(async (resolve, reject) => {
			try {
				if (isEmptyString(fields)) {
					throw ERROR_CODES.METHOD_PARAMS_NOT_VALID;
				}
				const mongoClient: MongoClient = await this.mongodb();
				const user = await mongoClient
					.db()
					.collection(this.registeredUserCollection).
					findOne(fields);

				mongoClient.close();
				delete user._id;
				resolve(user);
			} catch (err) {
				displayError(__filename, 'getByFields', err);
				reject(err);
			}
		})
	}

	createUser(newUser: RegisteredUser): Promise<RegisteredUser> {
		return new Promise(async (resolve, reject) => {
			//validate(newUser);

			try {
				const mongoClient: MongoClient = await this.mongodb();
				await mongoClient
					.db()
					.collection(this.registeredUserCollection)
					.insertOne(newUser);

				mongoClient.close();
				resolve(newUser);
			} catch (err) {
				displayError(__filename, 'createUser', err);
				reject(err);
			}
		});
	}

	updateUser(userId: string, updates: any): Promise<RegisteredUser> {
		/**
		 * example updates = { email: 'test@email.com', userName: 'test'}
		 */
		return new Promise(async (resolve, reject) => {
			if (isEmptyString(userId)) {
				throw ERROR_CODES.USER_ID_NOT_VALID;
			}

			try {
				const mongoClient: MongoClient = await this.mongodb();
				await mongoClient
					.db()
					.collection(this.registeredUserCollection)
					.updateOne({ userId: userId }, { $set: updates });

				const user = await mongoClient
					.db()
					.collection(this.registeredUserCollection)
					.findOne({ userId: userId });

				mongoClient.close();
				delete user._id;
				resolve(user);
			} catch (err) {
				displayError(__filename, 'updateUser', err);
				reject(err);
			}
		});
	}

	deleteUser(userId: string): Promise<RegisteredUser> {
		/**
		 * THIS IS FOR PHYSICAL DELETION
		 * !!IT IS PERMANENT!!
		 * FOR LOGIC DELETION USE: updateUser(userId, {isDeleted: true});
		 */
		return new Promise(async (resolve, reject) => {
			if (isEmptyString(userId)) {
				throw ERROR_CODES.USER_ID_NOT_VALID;
			}

			try {
				const mongoClient: MongoClient = await this.mongodb();
				const user = await mongoClient
					.db()
					.collection(this.registeredUserCollection)
					.findOne({ userId: userId });

				await mongoClient
					.db()
					.collection(this.registeredUserCollection)
					.deleteOne({ userId: userId });

				mongoClient.close();
				delete user._id;
				resolve(user);
			} catch (err) {
				displayError(__filename, 'deleteUser', err);
				reject(err);
			}
		});
	}

}