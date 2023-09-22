import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly username: string;
}
