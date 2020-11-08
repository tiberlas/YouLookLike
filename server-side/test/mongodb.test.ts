import chai from 'chai';
import sinon from 'sinon';
import { CheckUserMongo } from '../src/data/mongo/check-user.mongo';
import { RegisteredUserMongo } from '../src/data/mongo/registered-user.mongo';
import { RequestUserMongo } from '../src/data/mongo/request-user.mongo';
import { Hight, HIGHT_UNIT } from '../src/model/hight.model';
import { RegistrationRequest } from '../src/model/registration-request.model';
import { RegisteredUser } from '../src/model/registered-user.model';
import { Weight, WEIGHT_UNIT } from '../src/model/weight.model';
import { PERMISSIONS } from '../src/model/permissions.model';

const assert: Chai.Assert = chai.assert;

describe('checks MongoDB implementation', () => {

  var check: CheckUserMongo;
  var request: RequestUserMongo;
  var registered: RegisteredUserMongo;

  var request025: RegistrationRequest;
  var request026: RegistrationRequest;
  var request012: RegistrationRequest;

  var registered011: RegisteredUser;
  var registered012: RegisteredUser;


  before(() => {
    check = new CheckUserMongo();
    var checkColl1 = sinon.stub(check, "userRequestCollection");
    checkColl1.returns('test_user_requests');
    var checkColl2 = sinon.stub(check, "registeredUserCollection");
    checkColl2.returns('test_registered_users');

    request = new RequestUserMongo();
    var requestColl1 = sinon.stub(request, "userRequestCollection");
    requestColl1.returns('test_user_requests');
    var requestColl2 = sinon.stub(request, "registeredUserCollection");
    requestColl2.returns('test_registered_users');

    registered = new RegisteredUserMongo();
    var registeredColl1 = sinon.stub(registered, "userRequestCollection");
    registeredColl1.returns('test_user_requests');
    var registeredColl2 = sinon.stub(registered, "registeredUserCollection");
    registeredColl2.returns('test_registered_users');

    //REQUESTS
    request025 = new RegistrationRequest(
      false,
      true,
      'test025',
      'test025@mail',
      '1234',
      'test025',
      'test025',
      'test025',
      new Date(),
      new Hight(25, HIGHT_UNIT.INCHES),
      new Weight(15, WEIGHT_UNIT.STONES),
      '#025'
    )
    request026 = new RegistrationRequest(
      false,
      false,
      'test026',
      'test026@mail',
      '1234',
      'test026',
      'test026',
      'test026',
      new Date(),
      new Hight(25, HIGHT_UNIT.INCHES),
      new Weight(15, WEIGHT_UNIT.STONES),
      '#026'
    )
    request012 = new RegistrationRequest(
      true,
      false,
      'test012',
      'test012@mail',
      '1234',
      'test012',
      'test012',
      'test012',
      new Date(),
      new Hight(25, HIGHT_UNIT.INCHES),
      new Weight(15, WEIGHT_UNIT.STONES),
      '#012'
    )

    //REGISTERED USERS
    registered011 = new RegisteredUser(
      [PERMISSIONS.ADMIN_ROLE],
      false,
      'test011',
      'test011@mail',
      '1234',
      'test011',
      'test011',
      'test011',
      new Date(),
      new Hight(25, HIGHT_UNIT.INCHES),
      new Weight(15, WEIGHT_UNIT.STONES),
      '#011'
    );
    registered012 = new RegisteredUser(
      [PERMISSIONS.SIGN_IN],
      false,
      'test012',
      'test012@mail',
      '1234',
      'test012',
      'test012',
      'test012',
      new Date(),
      new Hight(25, HIGHT_UNIT.INCHES),
      new Weight(15, WEIGHT_UNIT.STONES),
      '#012'
    );
  });

  after(async () => {
    try {
      await registered.deleteUser(registered011.userId);
      await registered.deleteUser(registered012.userId);
      await request.deleteRequest(request012.userId);
      await request.deleteRequest(request025.userId);
      await request.deleteRequest(request026.userId);
    } catch (err) {
      console.log('AFTER ERROR: ', err);
    }
  });

  it('create request: 026', async () => {
    const requestColl2 = sinon.stub(request, "registeredUserCollection");
    requestColl2.returns('test_registered_users');

    console.log(request.registeredUserCollection);

    try {
      let requests = await request
        .createRequest(request026);
      //console.log(requests);

      assert.equal(requests.userId, '#026', 'created');
    } catch (err) {
      console.log(err);
      assert.fail('should created request');
    }
  });

  it('email test026 should exist', async () => {
    try {
      let res = await check
        .existEmail('test026@mail');

      assert.isTrue(res);
    } catch (err) {
      console.log(err);
      assert.fail('should be true');
    }
  });

  it('should find user 026', async () => {
    try {
      let res = await request
        .getRequestById('#026');

      assert.equal(res.name, request026.name);
      assert.equal(res.userName, request026.userName);
      assert.equal(res.nickname, request026.nickname);
      assert.equal(res.surname, request026.surname);
    } catch (err) {
      console.log(err);
      assert.fail();
    }
  });

  it('should insert all request', async () => {
    try {
      let r25 = await request
        .createRequest(request025);
      let r12 = await request
        .createRequest(request012);

      assert.equal(r25.userId, '#025', 'created');
      assert.equal(r12.userId, '#012', 'created');
    } catch (err) {
      console.log(err);
      assert.fail('should created all request');
    }
  });

  it('should insert all registered users', async () => {
    try {
      let r11 = await registered
        .createUser(registered011);
      let r12 = await registered
        .createUser(registered012);

      assert.equal(r11.userId, '#011', 'created');
      assert.equal(r12.userId, '#012', 'created');
    } catch (err) {
      console.log(err);
      assert.fail('should created all registered users');
    }
  });

  it('show all requests', async () => {
    const found = await request
      .getAllRequestByStateAndIsDeleted(null, null);
    console.log('ALL REQUESTS', found);
  })

  it('show all registered', async () => {
    const found = await registered
      .getAllRegisteredByPermissionsAndIsDeleted(null, null);
    console.log('ALL REGISTERED', found);
  })

  it('find all deleted requests', async () => {
    const found = await request
      .getAllRequestByStateAndIsDeleted(null, true);
    assert.equal(found.length, 1);
    assert.equal(found[0].userId, '#025');
  });

  it('find all accepted requests', async () => {
    const found = await request
      .getAllRequestByStateAndIsDeleted(true, null);

    console.log(found);
    assert.equal(found.length, 1);
    assert.equal(found[0].userId, '#012');
  });

  it('find all admin users', async () => {
    const found = await registered
      .getAllRegisteredByPermissionsAndIsDeleted(
        [PERMISSIONS.ADMIN_ROLE],
        false
      );
    assert.equal(found.length, 1);
    assert(found[0].userId, '#011');
  });

  it('find registered user with name test012', async () => {
    const found = await registered
      .getByFields(
        { name: 'test012' }
      );
    assert(found.userId, '#012');
  });

  it('find update name', async () => {
    const found = await registered
      .updateUser(
        '#012',
        { surname: 'The Test' }
      );

    const updated = await registered
      .getByUserId('#012');

    assert(found.userId, '#012');
    assert(updated.userId, '#012');
    assert(updated.surname, 'The Test');
    assert(updated.name, 'test012');
  });

  it('UserName test011 should exist', async () => {
    try {
      let res = await check.existUserName('test011');

      assert.isTrue(res);
    } catch (err) {
      console.log(err);
      assert.fail('should be true');
    }
  });

  it('email should not exist', async () => {
    try {
      let res = await check
        .existEmail('ovostvarnonijeemail');

      assert.isFalse(res);
    } catch (err) {
      console.log(err);
      assert.fail('should be false');
    }
  });

  it('UserName should not exist', async () => {
    try {
      let res = await check
        .existUserName('akoovonadjeondastvarno');

      assert.isFalse(res);
    } catch (err) {
      console.log(err);
      assert.fail('should be false');
    }
  });

  it('delete request: 026', async () => {
    try {
      let requests = await request
        .deleteRequest('#026');
      //console.log(requests);

      assert.equal(requests.userId, '#026', 'deleted');
    } catch (err) {
      console.log(err);
      assert.fail('should delete request');
    }
  });

});