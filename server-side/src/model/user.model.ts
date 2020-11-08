import { v4 as uuidv4 } from 'uuid';
import { Weight } from './weight.model';
import { Hight } from './hight.model';

export class UserModel {
    /**ACCOUNT SPECIFIC */
    userId: string;
    userName: string;
    email: string;
    password: string;
    /**USER SPECIFIC */
    name: string;
    surname: string;
    nickname: string;
    sexuality?: string;
    nationality?: string;
    birthDay: Date;
    country?: string;
    city?: string;
    profileImagePath?: string;
    hight: Hight;
    weight: Weight;
    /**LOGIC DELETION */
    isDeleted: boolean;

    constructor(
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
        this.isDeleted = isDeleted;
        this.userId = userId != undefined ? userId : "" + uuidv4();
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.nickname = nickname;
        this.profileImagePath = profileImagePath != undefined ? profileImagePath : 'ANONYMOUS';
        this.hight = hight;
        this.weight = weight;
        this.birthDay = birthDay;
        sexuality != undefined ? this.sexuality = sexuality : undefined;
        nationality != undefined ? this.nationality = nationality : undefined;
        country != undefined ? this.country = country : undefined;
        city != undefined ? this.city = city : undefined;
    }
}
