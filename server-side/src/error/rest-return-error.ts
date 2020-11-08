import { displayError } from "../common/err-log";
import { ERROR_CODES } from "./error-codes"

export const restError = (err: any): { status: number, msg: any } => {
  let status: number, msg: any;
  if (typeof err === 'string') {
    if (
      err == ERROR_CODES.DB_NOT_CONNECTED ||
      err == ERROR_CODES.METHOD_PARAMS_NOT_VALID ||
      err == ERROR_CODES.INTERNAL_SERVER_ERROR
    ) {
      status = 500;
      msg = { message: 'SERVER ERROR' };
    } else {
      status = 400;
      msg = { message: err };
    }

  } else {
    status = 500;
    msg = { message: 'SERVER ERROR' };
    displayError(__filename, 'ERROR THROWN ELSE WERE', err);
  }

  return { status, msg };
}