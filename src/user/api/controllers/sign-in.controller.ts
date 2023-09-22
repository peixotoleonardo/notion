import { Body, Controller, Inject, Post } from '@nestjs/common';

import { ISignInUseCase } from '@app/application/user/commands/sign-in/sign-in.use-case.interface';

import { SignInRequest } from '@notion/user/api/models/sign-in.request';
import { SignInCommand } from '@app/application/user/commands/sign-in/sign-in.command';
import { SignInResponse } from '@notion/user/api/models/sign-in.response';

@Controller('users/login')
export class SignInController {
  constructor(
    @Inject(ISignInUseCase)
    private readonly useCase: ISignInUseCase,
  ) {}

  @Post()
  async execute(@Body() request: SignInRequest) {
    const command = new SignInCommand(request.email, request.password);

    return SignInResponse.from(await this.useCase.execute(command));
  }
}
