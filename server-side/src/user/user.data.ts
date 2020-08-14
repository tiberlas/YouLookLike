import { UserModel } from './user.model';

export interface UserData {
	printAll(): Promise<void>;
	getAll(): Promise<UserModel[]>;
	getById(id: string): Promise<UserModel>;
	createUser(user: UserModel): Promise<string>;
	updateUser(user: UserModel): Promise<string>;
	deleteUser(id: string): Promise<boolean>;
}
