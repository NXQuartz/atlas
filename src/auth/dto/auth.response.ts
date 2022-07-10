export class AuthToken {
  /**
   * JWT Token
   */
  authToken!: string;

  constructor(authToken: string) {
    this.authToken = authToken;
  }
}
