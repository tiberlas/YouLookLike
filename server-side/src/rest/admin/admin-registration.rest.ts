import express from 'express';
import { RegisteredUserData } from '../../data/interfaces/registered-user.data';
import { RequestUserData } from '../../data/interfaces/request-user.data';
import { ERROR_CODES } from '../../error/error-codes';
import { AdminRegistrationService } from './admin-registration.service';
import { restError } from '../../error/rest-return-error';

export const adminRegistrationRest = (
	requestUserData: RequestUserData,
	registeredUserData: RegisteredUserData
): express.Router => {
	const router = express.Router();
	const registrationService = new AdminRegistrationService(
		requestUserData,
		registeredUserData
	);

	/**GET ALL REGISTRATION REQUESTS */
	router.get(
		'/registration-request',
		async (req: express.Request, res: express.Response) => {
			let status = 200;
			let requests: any;
			let isApproved = null;
			let isDeleted = null;
			if (req.query.isApproved != undefined) {
				isApproved = req.query.isApproved == 'true' ? true : false;
			}
			if (req.query.isDeleted != undefined) {
				isDeleted = req.query.isDeleted == 'true' ? true : false;
			}
			try {
				requests = await registrationService.getRegistrationRequests(isApproved, isDeleted);
			} catch (err) {
				let error = restError(err);
				status = error.status;
				requests = error.msg;
			}

			return res.status(status).json(requests);
		});

	/**DECLINE A REGISTRATION REQUEST */
	router.delete('/registration-request/:id', async (req, res) => {
		const id: string = req.params.id;
		let status: number = 200;
		let msg: any = { message: 'USER WITH ID: ' + id + ' SUCCESSFULLY DELETED' };

		try {
			await registrationService.deleteRegistrationRequest(id);
		} catch (err) {
			let error = restError(err);
			status = error.status;
			msg = error.msg;
		}

		return res.status(status).json(msg);
	});

	/**APPROVE REGISTRATION REQUEST */
	router.put('/registration-request/:id', async (req, res) => {
		const id: string = req.params.id;
		let status: number = 200;
		let msg: any = { message: 'USER WITH ID: ' + id + ' SUCCESSFULLY APPROVED' };

		try {
			await registrationService.approveRegistrationRequest(id);
		} catch (err) {
			let error = restError(err);
			status = error.status;
			msg = error.msg;
		}

		return res.status(status).json(msg);
	});

	return router
}

