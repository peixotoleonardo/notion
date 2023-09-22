import { CreateUserCommand } from '@app/application/user/commands/create/create-user.command';
import { CreateUserOutput } from '@app/application/user/commands/create/create-user.output';

export const ICreateUserUseCase = Symbol();

export interface ICreateUserUseCase {
  execute(command: CreateUserCommand): Promise<CreateUserOutput>;
}
