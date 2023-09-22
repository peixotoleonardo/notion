import { SignInOutput } from '@app/application/user/commands/sign-in/sign-in.output';

export class SignInResponse {
  private constructor(readonly access_token: string) {}

  static from(output: SignInOutput) {
    return new this(output.token);
  }
}
