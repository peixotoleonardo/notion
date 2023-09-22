import { Body, Controller, Inject, Post } from '@nestjs/common';

import { CreateUserCommand } from '@app/application/user/commands/create/create-user.command';
import { ICreateUserUseCase } from '@app/application/user/commands/create/create-user.use-case.interface';

import { UserConfig } from '@notion/user/config';
import { CreateUserRequest } from '@notion/user/api/models/create-user.request';
import { CreateUserResponse } from '@notion/user/api/models/create-user.response';

@Controller('users')
export class CreateUserController {
  constructor(
    @Inject(UserConfig)
    private readonly config: UserConfig,
    @Inject(ICreateUserUseCase)
    private readonly useCase: ICreateUserUseCase,
  ) {}

  @Post()
  async execute(@Body() request: CreateUserRequest) {
    const command = new CreateUserCommand(
      request.email,
      request.password,
      request.username,
      this.config.salt,
    );

    const output = await this.useCase.execute(command);

    return CreateUserResponse.from(output);
  }
}
