import { Identifier } from '@app/domain/common/identifier';
import { Email } from '@app/domain/common/value-objects/email';
import { UserValidator } from '@app/domain/user/user.validator';
import { AggregateRoot } from '@app/domain/common/aggregate-root';
import { ValidationHandler } from '@app/domain/common/validation/validation-handler';

export class User extends AggregateRoot {
  get email() {
    return this._email;
  }

  get username() {
    return this._username;
  }

  get token() {
    return this._token;
  }

  constructor(
    id: Identifier,
    private _email: Email,
    private _token: string,
    private _username: string,
    private _bio?: string,
    private _image?: string,
  ) {
    super(id);
  }

  static new(email: string, token: string, username: string) {
    return new this(Identifier.unique(), new Email(email), token, username);
  }

  async validate(handler: ValidationHandler) {
    await new UserValidator(handler, this).validate();
  }
}
