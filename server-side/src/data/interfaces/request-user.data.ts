import { RegistrationRequest } from '../../model/registration-request.model';

export interface RequestUserData {
    getAllRequestByStateAndIsDeleted(isApproved: boolean | null, isDeleted: boolean | null): Promise<RegistrationRequest[]>;
    getRequestById(userId: string): Promise<RegistrationRequest>;
    createRequest(newRequest: RegistrationRequest): Promise<RegistrationRequest>;
    updateRequest(userId: string, updates: any): Promise<RegistrationRequest>; //user must have UserId and the values that are updated; non updated values must be null! Logic deletion is done by this fun
    deleteRequest(userId: string): Promise<RegistrationRequest>; //fiscal deletion
}