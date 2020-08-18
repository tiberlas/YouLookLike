import express from 'express';
import { UserModel } from '../user.model';
import { UserData } from '../user.data';

enum FIELD {
	ROLE="ROLE",
	ACTIVE="ACTIVE",
	DELETED="DELETED",
};

export const adminRest = (userData: UserData): express.Router => {
	const router = express.Router();

	router.get('/registration', async(req, res) => {
		let status: number = 503;
		let msg: string | UserModel[] = 'DB IS NOT CONNECTED';

		await userData.getAll()
			.then((data: UserModel[]) => {
				status = 200;
				msg = data;
			}).catch((err) => {
				console.log(err);
			});

			return res.status(status).json(msg);
		});

	router.delete('/registration', async(req, res) => {
		const id:string = req.params.id;
		let status: number = 503;
		let msg: string = 'DB IS NOT CONNECTED';

		await userData.getById(id)
			.then(async(data: UserModel) => {
				if(!res) {
					status = 406;
					msg = 'USER DOSE NOT EXIST';
				} else {
					data.isDeleted = true;
					
					await userData.updateUser(data)
					.then(() => {
						status = 200;
						msg = 'DELETED USER';
					});
				}
			}).catch((err) => {
				console.log(err);
			});

		return res.status(status).json(msg);
	});

	router.put('/users', async(req, res) => {
		const id:string = req.body.id;
		const field: string = req.body.field;
		const value: string|boolean = req.body.value;
		
		let status: number = 503;
		let msg: string | UserModel[] = 'DB IS NOT CONNECTED';

		// await userData.updateUser();

	});

	return router
}

