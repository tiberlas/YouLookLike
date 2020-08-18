import express from 'express';
import { UserModel, ROLE } from './user.model';
import { UserData } from './user.data';

export const userRest = (userData: UserData) => {
	const router: express.Router = express.Router();
	
	router.get('/test', (req, res) => {
		return res.status(418).send('Test response');
	});

	router.post('/registration', async (req, res) => {
		let msg: string = 'CREATED REGISTRATION REQUEST';
		let status: number = 201;
		const user: UserModel = req.body;

		await validRegistrationRequest(user, userData)
			.then((err) => {
				if (err != null) {
					status = 406;
					msg = 'FIELD ' + err.toUpperCase();
				} else {
					user.isApproved = false;
					user.isActive = false;
					user.isDeleted = false;
					user.role = ROLE.USER;
					userData.createUser(user);
				}
			});

		return res.status(status).json(msg);
	});

	router.post('/authenticate', (req, res) => {
		//login
		const email: string = req.body.email;
		const password: string = req.body.password;
		let msg: string = 'BAD CREDENTIALS';
		let status: number = 406;

		userData.getByEmailAndPassword(email, password)
			.then((res) => {
				if(res != null && res != undefined) {
					status = 202;
					msg = `LOGGED IN SUCCESS; USER ID: ${res}`;
				}
			}).catch((err) => {
				status = 503;
				msg = 'CANNOT STORE DATA';
			}).finally(() => {
				return res.status(status).json(msg);
			});
	});

	router.delete('/authenticate', (req, res) => {
		//logout
		let msg: string = 'LOGGED OUT';
		let status: number = 200;

		return res.status(status).json(msg);
	});

	return router;
}

const validRegistrationRequest = async(user: any, userData: UserData): Promise<string|null> => {
	let ret: string | null = null;
	const params: string[] = ['email', 'userName', 'password'];

	params.forEach((p) => {
		if (
			user[p] == undefined ||
			user[p] == null ||
			user[p].trim() === ''
		) {
			ret = p + ' IS NOT VALID';
		}
	});
	if(user.email.indexOf('@') === -1) {
		ret = 'email IS NOT VALID';
	}
	if(ret == null){
		await userData.existEmail(user.email)
			.then((res) => {
				if(res) {
					ret = 'EMAIL ALREADY EXISTS!';
				}
		});
		await userData.existUserName(user.userName)
			.then((res) => {
				if(res) {
					ret = 'USER NAME ALREADY EXISTS!';
				}
			});
	}

	return ret;
}
