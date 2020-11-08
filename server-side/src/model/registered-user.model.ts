import { UserModel } from "./user.model";
import { PERMISSIONS } from "./permissions.model";
import { Hight } from "./hight.model";
import { Weight } from "./weight.model";

export class RegisteredUser extends UserModel {

    permissions: PERMISSIONS[];

    constructor(
        permissions: PERMISSIONS[],
        isDeleted: boolean,
        userName: string,
        email: string,
        password: string,
        name: string,
        surname: string,
        nickname: string,
        birthDay: Date,
        hight: Hight,
        weight: Weight,
        userId?: string,
        sexuality?: string,
        nationality?: string,
        country?: string,
        city?: string,
        profileImagePath?: string
    ) {
        super(
            isDeleted,
            userName,
            email,
            password,
            name,
            surname,
            nickname,
            birthDay,
            hight,
            weight,
            userId,
            sexuality,
            nationality,
            country,
            city,
            profileImagePath
        );
        this.permissions = permissions;
    }

}