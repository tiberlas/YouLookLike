import { RestLogger } from '../common/rest_logger';

export const restLogger = (req: any, res: any, next: any): void => {

	//TODO: from JWT read user name
	const myRestLogger: RestLogger = new RestLogger();
	myRestLogger.log(req.method, req.path, 'NOT REGISTERED');

	next();
};

export const deleteLoggerFile = (): void => {
	const myRestLogger: RestLogger = new RestLogger();
	myRestLogger.deleteFile();
}
