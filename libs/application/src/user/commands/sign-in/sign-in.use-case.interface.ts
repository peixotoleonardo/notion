import { SignInOutput } from '@app/application/user/commands/sign-in/sign-in.output';
import { SignInCommand } from '@app/application/user/commands/sign-in/sign-in.command';

export const ISignInUseCase = Symbol();

export interface ISignInUseCase {
  execute(command: SignInCommand): Promise<SignInOutput>;
}
