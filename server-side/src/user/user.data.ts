import { UserModel } from './user.model';

export interface UserData {
	printAll(): Promise<void>;
	getAll(): Promise<UserModel[]>;
	getUsers() : Promise<UserModel[]>;
	getAdmins() : Promise<UserModel[]>;
	getActiveUsers() : Promise<UserModel[]>;
	getBandedUsers() : Promise<UserModel[]>;
	getRegistrationRequests() : Promise<UserModel[]>;
	getById(id: string): Promise<UserModel>;
	getByEmailAndPassword(email: string, password: string): Promise<UserModel>;
	createUser(user: UserModel): Promise<string>;
	updateUser(user: UserModel): Promise<string>;
	deleteUser(id: string): Promise<boolean>;
	existEmail(email: string): Promise<boolean>;
	existUserName(userName: string): Promise<boolean>;
}
