import express from 'express';
import { RegisteredUserData } from '../../data/interfaces/registered-user.data';
import { restError } from '../../error/rest-return-error';
import { RegisteredUser } from '../../model/registered-user.model';
import { AdminUserService } from './admin.user.service';

export const adminUserRest = (
	registeredUserData: RegisteredUserData
): express.Router => {
	const router = express.Router();
	const userService: AdminUserService = new AdminUserService(registeredUserData);
	/**
	* GET ALL USERS
	* @path: /users/all?deleted=true&show=admin
	* @query-params: {
	* deleted: true | false
	* show: admin | users | banned | only-view
	* } 
	*/
	router.get('/user/all',
		async (req: express.Request, res: express.Response) => {
			let status = 200;
			let content: any = {};
			try {
				const deleted: boolean | null = req.query.deleted ?
					(req.query.deleted == 'true' ? true : false) : null;
				const show: string | null = req.query.show ?
					'' + req.query.show : null;

				const users: RegisteredUser[] = await
					userService.getAllUsers(
						deleted,
						show
					);
				content = users;
			} catch (err) {
				let error = restError(err);
				status = error.status;
				content = error.msg;
			}

			return res.status(status).json(content);
		});

	/**
	 * GET SPECIFIC USER
	 * */
	router.get('/user/:userId',
		async (req: express.Request, res: express.Response) => {
			let status = 200;
			let content: any = {};

			const userId: string = req.params.userId;

			try {
				const user: RegisteredUser = await
					userService
						.getSpecificUser(userId);
				content = user;
			} catch (err) {
				let error = restError(err);
				status = error.status;
				content = error.msg;
			}

			return res.status(status).json(content);
		});

	/**SET PERMISSIONS */
	router.put('/user/:userId',
		async (req: express.Request, res: express.Response) => {
			let status = 200;
			let content: any = {};

			const userId: string = req.params.userId;
			const permissions: string = req.body.permissions;
			const deleted: boolean | null = req.body.deleted ?
				req.body.deleted : null;

			try {
				const user: RegisteredUser = await
					userService
						.updateUser(
							userId,
							permissions,
							deleted
						);
				content = user;
			} catch (err) {
				let error = restError(err);
				status = error.status;
				content = error.msg;
			}

			return res.status(status).json(content);
		});

	/**REMOVE USER */
	router.delete('/user/:userId',
		async (req: express.Request, res: express.Response) => {
			let status = 200;
			let content: any = {};

			const userId: string = req.params.userId;

			try {
				await userService.removeUser(userId);
				content = { message: "USER WITH ID: " + userId + " SUCCESSFULLY REMOVED" };
			} catch (err) {
				let error = restError(err);
				status = error.status;
				content = error.msg;
			}

			return res.status(status).json(content);
		});


	return router;
}
