import express from 'express';
import path from 'path';
import { appConfig } from './config';
import { restLogger } from './interceptor/logger.interceptor';
import { CheckUserData } from './data/interfaces/check-user.data';
import { RegisteredUserData } from './data/interfaces/registered-user.data';
import { RequestUserData } from './data/interfaces/request-user.data';
import { adminRegistrationRest } from './rest/admin/admin-registration.rest';
import { adminUserRest } from './rest/admin/admin.user.rest';
import { userRest } from './rest/user.rest';

export const server = (
	check: CheckUserData,
	register: RegisteredUserData,
	request: RequestUserData
): express.Application => {

	const app: express.Application = express();
	const clientPath: string = path.join(__dirname, '..', 'client');

	//JSON CONFIGURATION
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	//MY LOGGER COMPONENT
	app.use(restLogger);

	app.use(
		appConfig.BASE_URL,
		adminRegistrationRest(request, register)
	);
	app.use(
		appConfig.BASE_URL,
		adminUserRest(register)
	);
	app.use(
		appConfig.BASE_URL,
		userRest(check, request, register)
	);

	app.use(express.static(clientPath));
	return app;
}
