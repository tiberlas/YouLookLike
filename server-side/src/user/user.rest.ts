import express from 'express';
import { UserModel } from './user.model';
import { UserData } from './user.data';

function userRest(userData: UserData) {
	const router: express.Router = express.Router();
	const users = userData;

	router.post('/reqistration', (req, res) => {
		let msg: string = 'CREATED REGISTRATION REQUEST';
		let status: number = 201;
		const user: UserModel = req.body;

		const err = validReqistrationRequest(user);
		if (err != null) {
			status = 406;
			msg = 'FIELD ' + err.toUpperCase() + ' IS NOT VALID';
		}

		return res.status(status).json(msg);
	});

	return router;
}

function validReqistrationRequest(user: any): string | null {
	let ret: string | null = null;
	const params: string[] = ['email', 'userName', 'password', 'role'];

	params.forEach((p) => {
		if (
			user[p] == undefined ||
			user.email == null ||
			user.email.trim() === ''
		) {
			ret = p;
		}
	});

	return ret;
}

module.exports = userRest;
