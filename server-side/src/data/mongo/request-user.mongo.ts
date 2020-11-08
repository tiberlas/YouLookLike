import { MongoClient } from "mongodb";
import { RegistrationRequest } from "../../model/registration-request.model";
import { RequestUserData } from "../interfaces/request-user.data";
import { OpenConnectionMongo } from "./open-connection.mongo";
import { displayError } from '../../common/err-log';
import { ERROR_CODES } from "../../error/error-codes";
import { isEmptyString, validate } from "../../common/validate-user";

export class RequestUserMongo
	extends OpenConnectionMongo
	implements RequestUserData {

	getAllRequestByStateAndIsDeleted(
		isApproved: boolean | null,
		isDeleted: boolean | null
	): Promise<RegistrationRequest[]> {

		const findCriteria: any = {};

		isApproved != null && isApproved != undefined ?
			findCriteria['isApproved'] = isApproved : undefined;

		isDeleted != null && isDeleted != undefined ?
			findCriteria['isDeleted'] = isDeleted : undefined;

		return new Promise(async (resolve, reject) => {
			try {
				const mongoClient: MongoClient = await this.mongodb();

				const document = await mongoClient
					.db()
					.collection(this.userRequestCollection)
					.find(findCriteria)
					.toArray();

				mongoClient.close();

				const req: any = document.map(item => {
					delete item._id;
					return item;
				});

				resolve(req);

			} catch (err) {
				displayError(__filename, 'getAllRequests', err);
				reject(err);
			}
		});
	}

	getRequestById(userId: string): Promise<RegistrationRequest> {
		return new Promise(async (resolve, reject) => {
			if (isEmptyString(userId)) {
				throw ERROR_CODES.USER_ID_NOT_VALID;
			}

			try {
				const mongoClient: MongoClient = await this.mongodb();
				const document = await mongoClient
					.db()
					.collection(this.userRequestCollection)
					.findOne({ userId: userId });

				if (document === null || document === undefined) {
					reject('NO USER WITH ID: ' + userId);
				}

				mongoClient.close();
				delete document._id;
				resolve(document);

			} catch (err) {
				displayError(__filename, 'getRequestById', err);
				reject(err);
			}
		});
	}

	createRequest(
		newRequest: RegistrationRequest
	): Promise<RegistrationRequest> {

		return new Promise(async (resolve, reject) => {
			//validate(newRequest); //NOT NEEDED

			try {
				const mongoClient: MongoClient = await this.mongodb();
				await mongoClient
					.db()
					.collection(this.userRequestCollection)
					.insertOne(newRequest);

				mongoClient.close();
				resolve(newRequest);

			} catch (err) {
				displayError(__filename, 'createRequest', err);
				reject(err);
			}
		});
	}

	updateRequest(
		userId: string,
		updates: any
	): Promise<RegistrationRequest> {

		return new Promise(async (resolve, reject) => {
			if (isEmptyString(userId)) {
				throw ERROR_CODES.USER_ID_NOT_VALID;
			}

			try {
				const mongoClient: MongoClient = await this.mongodb();
				await mongoClient
					.db()
					.collection(this.userRequestCollection)
					.updateOne({ userId: userId }, { $set: updates });

				const request = await mongoClient
					.db()
					.collection(this.userRequestCollection)
					.findOne({ userId: userId });

				mongoClient.close();
				delete request._id;
				resolve(request);

			} catch (err) {
				displayError(__filename, 'updateRequest', err);
				reject(err);
			}
		});
	}

	deleteRequest(userId: string): Promise<RegistrationRequest> {
		/**
		 * THIS IS FOR PHYSICAL DELETION
		 * !!IT IS PERMANENT!!
		 * FOR LOGIC DELETION USE: updateRequest(userId, {isDeleted: true});
		 */
		if (isEmptyString(userId)) {
			throw ERROR_CODES.USER_ID_NOT_VALID;
		}

		return new Promise(async (resolve, reject) => {
			try {
				const mongoClient: MongoClient = await this.mongodb();
				const request = await mongoClient
					.db()
					.collection(this.userRequestCollection)
					.findOne({ userId: userId });

				await mongoClient
					.db()
					.collection(this.userRequestCollection)
					.deleteOne({ userId: userId });

				mongoClient.close();
				delete request._id;
				resolve(request);

			} catch (err) {
				displayError(__filename, 'deleteRequest', err);
				reject(err);
			}
		});
	}
}