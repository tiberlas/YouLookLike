import { ERROR_CODES } from "../error/error-codes";
import { UserModel } from "../model/user.model";

export const validate = (user: UserModel) => {
  if (isEmptyString(user.userId)) {
    throw ERROR_CODES.USER_ID_NOT_VALID;
  }
  if (isEmptyString(user.email) || user.email.indexOf('@') == -1) {
    throw ERROR_CODES.USER_EMAIL_NOT_VALID;
  }
  if (isEmptyString(user.userName)) {
    throw ERROR_CODES.USER_USERNAME_NOT_VALID;
  }
  if (isEmptyString(user.password)) {
    throw ERROR_CODES.USER_PASSWORD_NOT_VALID;
  }
  if (isEmptyString(user.name)) {
    throw ERROR_CODES.USER_NAME_NOT_VALID;
  }
  if (isEmptyString(user.surname)) {
    throw ERROR_CODES.USER_SURNAME_NOT_VALID;
  }
  if (isEmptyString(user.nickname)) {
    throw ERROR_CODES.USER_NICKNAME_NOT_VALID;
  }
  if (isEmptyObj(user.weight) || isEmptyString(user.weight.unit) || isEmptyNumber(user.weight.value)) {
    throw ERROR_CODES.USER_WEIGHT_NOT_VALID;
  }
  if (isEmptyObj(user.hight) || isEmptyString(user.hight.unit) || isEmptyNumber(user.hight.value)) {
    throw ERROR_CODES.USER_HIGHT_NOT_VALID;
  }
}

export const isEmptyString = (field: string): boolean => {
  let empty = false;
  if (field == null || field == undefined || field.trim() == "") {
    empty = true;
  }

  return empty;
}

export const isEmptyObj = (field: any): boolean => {
  let empty = false;
  if (field == null || field == undefined) {
    empty = true;
  }

  return empty;
}

export const isEmptyNumber = (field: number): boolean => {
  let empty = false;
  if (field == null || field == undefined) {
    empty = true;
  }

  return empty;
}