import chai from 'chai';
import { validate } from '../src/common/validate-user';
import { ERROR_CODES } from '../src/error/error-codes';
import { restError } from '../src/error/rest-return-error';
import { Hight, HIGHT_UNIT } from '../src/model/hight.model';
import { UserModel } from '../src/model/user.model';
import { Weight, WEIGHT_UNIT } from '../src/model/weight.model';

const assert: Chai.Assert = chai.assert;

describe('check if rest returns proper error codes', () => {

  it('should return 400', async () => {
    let { status, msg } = restError(ERROR_CODES.USER_EMAIL_EXIST);

    console.log(status);
    console.log(msg)
    assert.equal(status, 400);
  });

  it('should return 500', async () => {
    let { status, msg } = restError(ERROR_CODES.DB_NOT_CONNECTED);

    console.log(status);
    console.log(msg)
    assert.equal(status, 500);
  });

  it('ERROR should return 500', async () => {
    let { status, msg } = restError(new Error());

    console.log(status);
    console.log(msg)
    assert.equal(status, 500);
  });

  it('validator email should return 400', async () => {
    const user: UserModel = new UserModel(false, 't', 't', 'pass', 't', 't', 't', new Date(), new Hight(25, HIGHT_UNIT.CENTIMETERS), new Weight(25, WEIGHT_UNIT.KILOGRAMS));

    try {
      validate(user);
    } catch (err) {
      let { status, msg } = restError(err);
      console.log(status);
      console.log(msg)
      assert.equal(status, 400);
      assert.equal(msg.message, "USER'S EMAIL IS NOT VALID");
    }
  });

});
