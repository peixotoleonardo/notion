import { CreateUserOutput } from '@app/application/user/commands/create/create-user.output';

export class CreateUserResponse {
  private constructor(
    readonly email: string,
    readonly username: string,
  ) {}

  static from(output: CreateUserOutput): CreateUserResponse {
    return new this(output.email, output.username);
  }
}
