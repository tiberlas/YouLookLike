import { v4 as uuidv4 } from 'uuid';
import { generateToken } from '../common/create-jwt';
import { CreateRegistrationRequest } from '../common/create-registration-request';
import { validate } from '../common/validate-user';
import { CheckUserData } from "../data/interfaces/check-user.data";
import { RegisteredUserData } from "../data/interfaces/registered-user.data";
import { RequestUserData } from "../data/interfaces/request-user.data";
import { ERROR_CODES } from '../error/error-codes';
import { CredentialModel } from "../model/credential.model";
import { RegisteredUser } from '../model/registered-user.model';
import { UserModel } from "../model/user.model";

export class UserService {

  checkUserData: CheckUserData;
  requestUserData: RequestUserData;
  registeredUserData: RegisteredUserData;

  constructor(
    checkUserData: CheckUserData,
    requestUserData: RequestUserData,
    registeredUserData: RegisteredUserData
  ) {
    this.checkUserData = checkUserData;
    this.requestUserData = requestUserData;
    this.registeredUserData = registeredUserData;
  }

  authenticate = async (credentials: CredentialModel) => {
    let user: RegisteredUser;

    if (credentials.email != undefined) {
      user = await this.checkCredentials(
        'email',
        credentials.email,
        credentials.password
      );
    } else if (credentials.userName != undefined) {
      user = await this.checkCredentials(
        'userName',
        credentials.userName,
        credentials.password
      );
    } else {
      throw ERROR_CODES.USER_DOSE_NOT_EXIST;
    }

    return generateToken(user);
  }

  createRequest = async (user: UserModel) => {

    validate(user);
    const emailExists = await this.checkUserData.existEmail(user.email);
    const nameExists = await this.checkUserData.existUserName(user.userName);
    if (emailExists === true) {
      throw ERROR_CODES.USER_EMAIL_EXIST;
    }
    if (nameExists === true) {
      throw ERROR_CODES.USER_USERNAME_EXIST;
    }

    user.userId = uuidv4();
    const registrationRequest = CreateRegistrationRequest(user);
    const written = await
      this.requestUserData.createRequest(registrationRequest);
    return written;
  }

  private checkCredentials = async (
    field: string,
    value: string,
    password: string
  ): Promise<RegisteredUser> => {
    const searchField: any = {};
    searchField[field] = value;

    const user = await
      this.registeredUserData.getByFields(searchField);
    if (
      user === undefined ||
      user === null ||
      user.password !== password
    ) {
      throw ERROR_CODES.CREDENTIALS_NOT_VALID;
    }

    return user;
  }
}