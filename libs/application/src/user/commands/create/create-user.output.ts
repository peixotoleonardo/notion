import { User } from '@app/domain/user/user';

export class CreateUserOutput {
  private constructor(
    readonly email: string,
    readonly username: string,
  ) {}

  static from(user: User) {
    return new this(user.email.value, user.username);
  }
}
