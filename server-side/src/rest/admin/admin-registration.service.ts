import { RequestUserData } from '../../data/interfaces/request-user.data';
import { PERMISSIONS } from '../../model/permissions.model';
import { RegisteredUser } from '../../model/registered-user.model';
import { RegistrationRequest } from '../../model/registration-request.model';
import { createRegisteredUser } from '../../common/create-registered-user';
import { RegisteredUserData } from '../../data/interfaces/registered-user.data';

export class AdminRegistrationService {

  requestUserData: RequestUserData;
  registeredUserData: RegisteredUserData;

  constructor(
    requestUserData: RequestUserData,
    registeredUserData: RegisteredUserData
  ) {
    this.requestUserData = requestUserData;
    this.registeredUserData = registeredUserData
  }

  getRegistrationRequests = async (
    isApproved: boolean | null,
    isDeleted: boolean | null
  ): Promise<RegistrationRequest[]> => {
    const requests = await this.
      requestUserData.
      getAllRequestByStateAndIsDeleted(isApproved, isDeleted);
    return requests;
  }

  deleteRegistrationRequest = async (userId: string): Promise<RegistrationRequest> => {
    const updates = { isApproved: false, isDeleted: true };
    const request = await this.requestUserData.updateRequest(userId, updates);
    return request;
  }

  approveRegistrationRequest = async (userId: string): Promise<RegisteredUser> => {
    const updates = { isApproved: true, isDeleted: false };
    const permissions = [
      PERMISSIONS.ADD_COMMENT,
      PERMISSIONS.ADD_PICTURE,
      PERMISSIONS.SIGN_IN,
      PERMISSIONS.VIEW_OTHERS,
      PERMISSIONS.VIEW_STATS
    ];
    const request = await this.requestUserData.updateRequest(userId, updates);
    const user = createRegisteredUser(request, permissions);
    const created = await this.registeredUserData.createUser(user);
    return created;
  }
}