import chai from 'chai';
import { validate } from '../src/common/validate-user';
import { ERROR_CODES } from '../src/error/error-codes';
import { Hight, HIGHT_UNIT } from '../src/model/hight.model';
import { UserModel } from '../src/model/user.model';
import { Weight, WEIGHT_UNIT } from '../src/model/weight.model';

const assert: Chai.Assert = chai.assert;

describe('tests the user validator in: common/validate-user', () => {
  let user: any;
  before(() => {
    user = new UserModel(
      false,
      'tt',
      'tt@email.com',
      'pass',
      't',
      't',
      't',
      new Date(),
      new Hight(25, HIGHT_UNIT.CENTIMETERS),
      new Weight(25, WEIGHT_UNIT.KILOGRAMS)
    );
  });

  it('validator should pass', () => {
    try {
      validate(user);
    } catch (err) {
      console.log('ERR: ', err);
      assert.fail('should not have caught error');
    }

    assert.isOk('passes', 'everything is ok');
  });

  it('bad user id', () => {
    user.userId = null;
    assert.throws(() => validate(user), ERROR_CODES.USER_ID_NOT_VALID);
    user.userId = '#001';
  });

  it('bad user email', () => {
    user.email = 'ttmail.com';
    assert.throws(() => validate(user), ERROR_CODES.USER_EMAIL_NOT_VALID);
    user.email = 'tt@email.com';

  });

  it('bad user weight', () => {
    user.weight = { unit: 'test' };
    assert.throws(() => validate(user), ERROR_CODES.USER_WEIGHT_NOT_VALID);
    user.weight = new Weight(25, WEIGHT_UNIT.KILOGRAMS)
  });

});