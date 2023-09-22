import { User } from '@app/domain/user/user';

import { IHash } from '@app/application/common/services/hash';
import { CreateUserOutput } from '@app/application/user/commands/create/create-user.output';
import { CreateUserCommand } from '@app/application/user/commands/create/create-user.command';
import { ICreateUserUseCase } from '@app/application/user/commands/create/create-user.use-case.interface';
import { IUserWriteOnlyRepository } from '@app/application/user/repositories/user-write-only.repository.interface';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly hash: IHash,
    private readonly userWriteOnly: IUserWriteOnlyRepository,
  ) {}

  async execute(command: CreateUserCommand) {
    const user = User.new(
      command.email, 
      await this.hash.execute(command.password, command.salt),
      command.username,
    );

    await this.userWriteOnly.add(user);

    return CreateUserOutput.from(user);
  }
}
