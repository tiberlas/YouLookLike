import { InfoLogger } from '../common/info_logger';

export enum ROLE {
	USER='USER',
	ADMIN='ADMIN'
}

export class UserModel extends InfoLogger {
	_id: string;
	userName: string;
	email: string;
	password: string;
	role: ROLE;
	isDeleted: boolean;
	isActive: boolean;
	isApproved: boolean;

	constructor(
		userName: string,
		email: string,
		password: string,
		role: ROLE,
		id?: string,
		isDeleted?: boolean,
		isActive?: boolean,
		isApproved?: boolean
	) {
		super();
		this._id = id != undefined ? id : '';
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.role = role;
		this.isDeleted = isDeleted != undefined ? isDeleted : false;
		this.isActive = isActive != undefined ? isActive : false;
		this.isApproved = isApproved != undefined ? isApproved : false;
	}
}
