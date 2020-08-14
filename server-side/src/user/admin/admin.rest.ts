import express from 'express';

// const userRequests: UserRequestData = new UserRequestData();
// const buyers = require('../buyer/buyer.data');
const router = express.Router();

// router.get('/registration-request', (req, res) => {
// 	let msg: UserRequestModel[] | string;
// 	let statusNumber: number = 200;

// 	try {
// 		let status: string = req.params.status;
// 		switch (status) {
// 			case 'unregistrated':
// 				msg = userRequests.getUnregisterd();
// 				break;
// 			case 'registrated':
// 				msg = userRequests.getRegistered();
// 				break;
// 			default:
// 				msg = userRequests.getAll();
// 		}
// 	} catch (err) {
// 		console.log(err);
// 		msg = 'Internal server error';
// 		statusNumber = 501;
// 	}

// 	return res.status(statusNumber).json(msg);
// });

// router.post('/registration-request', (req, res) => {
// 	let msg: string = '';
// 	let status: number = 201;
// 	const user: UserRequestModel = req.body;

// 	if (validateAccount(user) == true) {
// 		try {
// 			userRequests.add(user);
// 			msg = 'CREATER REGISTRATION REQUEST';
// 		} catch (err) {
// 			msg = err.err;
// 			status = 406;
// 		}
// 	} else {
// 		status = 406;
// 		msg = 'INVALID USERNAME OR EMAIL';
// 	}

// 	return res.status(status).json(msg);
// });

// router.put('/registration-request', (req, res) => {
// 	let msg: string = '';
// 	let status: number = 201;
// 	const userId: string = req.body.id;
// 	const user: UserRequestModel | null = userRequests.getWithId(userId);

// 	if (user != null) {
// 		try {
// 			userRequests.approve(userId);
// 			if (user.isOwner == false) {
// 				buyers.push(createBuyer(user));
// 				msg = 'CREATER BUYER';
// 			} else {
// 				//add to owner data
// 				msg = 'CREATER OWNER';
// 			}
// 		} catch (err) {
// 			msg = err;
// 			status = 406;
// 		}
// 	} else {
// 		msg = 'INVALID USER ID';
// 		status = 406;
// 	}

// 	return res.status(status).json(msg);
// });

// router.delete('/registration-request/:id', (req, res) => {
// 	let id: string = req.params.id;
// 	userRequests.remove(id);
// 	return res.status(200).send();
// });

// const validateAccount = (account: UserRequestModel): boolean => {
// 	if (
// 		account.email &&
// 		account.userName &&
// 		account.isOwner !== undefined &&
// 		account.email.trim() !== '' &&
// 		account.userName.trim() !== '' &&
// 		account.email.indexOf('@') != -1
// 	) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// };

// const createBuyer = (user: UserRequestModel): BuyerModel => {
// 	let buyer: BuyerModel = new BuyerModel(user.userName, user.email, 123456);

// 	return buyer;
// };

module.exports = router;
