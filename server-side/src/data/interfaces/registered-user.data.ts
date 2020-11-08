import { PERMISSIONS } from '../../model/permissions.model';
import { RegisteredUser } from '../../model/registered-user.model';

export interface RegisteredUserData {
	printAllRegistered(): Promise<void>;
	getAllRegisteredByPermissionsAndIsDeleted(permissions: PERMISSIONS[] | null, isDeleted: boolean | null): Promise<RegisteredUser[]>;

	getByUserId(userId: string): Promise<RegisteredUser>;
	getByFields(fields: any): Promise<RegisteredUser> //example fields = { email: 'test@email.com', userName: 'test'}

	createUser(newUser: RegisteredUser): Promise<RegisteredUser>;
	updateUser(userId: string, updates: any): Promise<RegisteredUser>; //user must have UserId and the values that are updated; non updated values must be null! Deletion is done by this fun
	deleteUser(userId: string): Promise<RegisteredUser>; //fiscal deletion
}
