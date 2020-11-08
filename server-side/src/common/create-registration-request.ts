import { RegistrationRequest } from "../model/registration-request.model";
import { UserModel } from "../model/user.model";

export const CreateRegistrationRequest = (user: UserModel): RegistrationRequest => {
  return new RegistrationRequest(
    false,
    user.isDeleted,
    user.userName,
    user.email,
    user.password,
    user.name,
    user.surname,
    user.nickname,
    user.birthDay,
    user.hight,
    user.weight,
    user.userId,
    user.sexuality,
    user.nationality,
    user.country,
    user.city,
    user.profileImagePath
  );
}