import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

/**
 * User creation form.
 */
export class CreateUser {
  /**
   * User's username.
   */
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  readonly username!: string;

  /**
   * User's email.
   */
  @IsEmail()
  readonly email!: string;

  /**
   * User's password.
   */
  @MinLength(8)
  @MaxLength(128)
  @IsNotEmpty()
  readonly password!: string;
}
