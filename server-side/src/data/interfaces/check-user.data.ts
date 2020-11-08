export interface CheckUserData {
    existEmail(email: string): Promise<boolean>;
    existUserName(userName: string): Promise<boolean>;
}