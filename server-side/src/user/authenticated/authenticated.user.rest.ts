import express from 'express';
import { UserData } from '../user.data';

export const authenticatedRest = (userData: UserData): express.Router => {
	const router = express.Router();

	return router;
}