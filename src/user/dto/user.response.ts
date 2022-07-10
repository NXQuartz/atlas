import { User } from 'src/entities/user';

/**
 * Public user data
 */
export class UserData {
  id!: string;
  createdAt!: Date;
  username!: string;
  email?: string;

  /**
   * Build a public user response object
   *
   * @param user to build an object for
   * @param publicView is this being viewed publicly?
   * @returns user response object
   */
  constructor(user: User, publicView = false) {
    return Object.assign(this, {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
      ...(!publicView && {
        email: user.email,
      }),
    });
  }
}
