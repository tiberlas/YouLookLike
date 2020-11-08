import { RegisteredUserData } from "../../data/interfaces/registered-user.data";
import { PERMISSIONS } from "../../model/permissions.model";
import { RegisteredUser } from "../../model/registered-user.model";


export class AdminUserService {

  registeredUserData: RegisteredUserData;

  constructor(
    registeredUserData: RegisteredUserData
  ) {
    this.registeredUserData = registeredUserData;
  }

  /**
   * @param {
   *  deleted - boolean if user is deleted,
   *  show: admin | users | banned | only-view
   * }
   */
  getAllUsers = async (
    deleted: boolean | null,
    show: string | null
  ): Promise<RegisteredUser[]> => {

    const permissions: PERMISSIONS[] = [];

    if (show != null) {
      switch (show) {
        case 'admin':
          permissions.push(PERMISSIONS.ADMIN_ROLE);
          permissions.push(PERMISSIONS.SIGN_IN);
          permissions.push(PERMISSIONS.VIEW_OTHERS);
          permissions.push(PERMISSIONS.VIEW_STATS);
          permissions.push(PERMISSIONS.ADD_COMMENT);
          permissions.push(PERMISSIONS.ADD_PICTURE);
          break;
        case 'banned':
          break;
        case 'only-view':
          permissions.push(PERMISSIONS.SIGN_IN);
          permissions.push(PERMISSIONS.VIEW_OTHERS);
          permissions.push(PERMISSIONS.VIEW_STATS);
          break;
        case 'users':
        default:
          permissions.push(PERMISSIONS.SIGN_IN);
          permissions.push(PERMISSIONS.VIEW_OTHERS);
          permissions.push(PERMISSIONS.VIEW_STATS);
          permissions.push(PERMISSIONS.ADD_COMMENT);
          permissions.push(PERMISSIONS.ADD_PICTURE);
      }
    } else {
      permissions.push(PERMISSIONS.SIGN_IN);
      permissions.push(PERMISSIONS.VIEW_OTHERS);
      permissions.push(PERMISSIONS.VIEW_STATS);
      permissions.push(PERMISSIONS.ADD_COMMENT);
      permissions.push(PERMISSIONS.ADD_PICTURE);
    }

    return await this
      .registeredUserData
      .getAllRegisteredByPermissionsAndIsDeleted(
        permissions,
        deleted
      );
  }

  getSpecificUser = async (
    userId: string
  ): Promise<RegisteredUser> => {

    return await this
      .registeredUserData
      .getByUserId(userId);
  }

  /**
   * @param {
   *  userId 
   *  deleted - boolean if user is deleted,
   *  newPermissions: admin | users | banned | only-view
   * }
   */
  updateUser = async (
    userId: string,
    newPermissions: string,
    deleted: boolean | null
  ): Promise<RegisteredUser> => {

    let updates: any = {};
    if (deleted != null) {
      updates.isDeleted = deleted;
    }

    const permissions: PERMISSIONS[] = [];
    switch (newPermissions) {
      case 'admin':
        permissions.push(PERMISSIONS.ADMIN_ROLE);
        permissions.push(PERMISSIONS.SIGN_IN);
        permissions.push(PERMISSIONS.VIEW_OTHERS);
        permissions.push(PERMISSIONS.VIEW_STATS);
        permissions.push(PERMISSIONS.ADD_COMMENT);
        permissions.push(PERMISSIONS.ADD_PICTURE);
        break;
      case 'banned':
        break;
      case 'only-view':
        permissions.push(PERMISSIONS.SIGN_IN);
        permissions.push(PERMISSIONS.VIEW_OTHERS);
        permissions.push(PERMISSIONS.VIEW_STATS);
        break;
      case 'user':
      default:
        permissions.push(PERMISSIONS.SIGN_IN);
        permissions.push(PERMISSIONS.VIEW_OTHERS);
        permissions.push(PERMISSIONS.VIEW_STATS);
        permissions.push(PERMISSIONS.ADD_COMMENT);
        permissions.push(PERMISSIONS.ADD_PICTURE);
    }
    updates.permissions = permissions;

    const user = await this
      .registeredUserData
      .updateUser(userId, updates);

    return user;
  }

  removeUser = async (
    userId: string
  ) => {

    await this
      .registeredUserData
      .updateUser(userId, { isDeleted: true });
  }
}