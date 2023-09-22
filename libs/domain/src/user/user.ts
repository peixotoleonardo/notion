import { Identifier } from '@app/domain/common/identifier';
import { Email } from '@app/domain/common/value-objects/email';
import { AggregateRoot } from '@app/domain/common/aggregate-root';

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

  private constructor(
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
    return new this(Identifier.unique(), Email.with(email), token, username);
  }

  static with(
    id: string,
    email: string,
    token: string,
    username: string,
    bio: string,
    image: string,
  ) {
    return new this(
      Identifier.with(id),
      Email.with(email),
      token,
      username,
      bio,
      image,
    );
  }
}
