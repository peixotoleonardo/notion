import { UnauthorizedException } from '@nestjs/common';

import { IJwt } from '@app/application/common/services/jwt';
import { IHash } from '@app/application/common/services/hash';

import { SignInOutput } from '@app/application/user/commands/sign-in/sign-in.output';
import { SignInCommand } from '@app/application/user/commands/sign-in/sign-in.command';
import { ISignInUseCase } from '@app/application/user/commands/sign-in/sign-in.use-case.interface';
import { IUserReadOnlyRepository } from '@app/application/user/repositories/user-read-only.repository.interface';

export class SignInUseCase implements ISignInUseCase {
  constructor(
    private readonly jwt: IJwt,
    private readonly hash: IHash,
    private readonly repository: IUserReadOnlyRepository,
  ) {}

  async execute(command: SignInCommand): Promise<SignInOutput> {
    const user = await this.repository.get({ email: command.email });

    if (!user || !(await this.hash.compare(command.password, user.token))) {
      throw new UnauthorizedException();
    }

    const token = await this.jwt.sign({
      sub: user.id.value,
      username: user.username,
    });

    return new SignInOutput(token);
  }
}
