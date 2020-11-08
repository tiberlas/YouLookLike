import { RegistrationRequest } from '../model/registration-request.model';
import { RegisteredUser } from '../model/registered-user.model';
import { PERMISSIONS } from '../model/permissions.model';

export const createRegisteredUser = (request: RegistrationRequest, permissions: PERMISSIONS[]): RegisteredUser => {
    return new RegisteredUser(
        permissions,
        request.isDeleted,
        request.userName,
        request.email,
        request.password,
        request.name,
        request.surname,
        request.nickname,
        request.birthDay,
        request.hight,
        request.weight,
        request.userId,
        request.sexuality,
        request.nationality,
        request.country,
        request.city,
        request.profileImagePath
    );
}