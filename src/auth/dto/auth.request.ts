import { IsNotEmpty } from 'class-validator';

export class AuthForm {
  @IsNotEmpty()
  readonly auth!: string;

  @IsNotEmpty()
  readonly password!: string;
}
