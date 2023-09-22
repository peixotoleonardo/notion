import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IHash } from '@app/application/common/services/hash';
import { IUserWriteOnlyRepository } from '@app/application/user/repositories';
import {
  ICreateUserUseCase,
  CreateUserUseCase,
} from '@app/application/user/commands/create';

import { userConfigFactory } from '@notion/user/config';
import { UserEntity } from '@notion/user/data/user.entity';
import { UserRepository } from '@notion/user/data/user.repository';
import { CreateUserController } from '@notion/user/api/controllers/create-user.controller';
import { SignInController } from '@notion/user/api/controllers/sign-in.controller';
import { ISignInUseCase } from '@app/application/user/commands/sign-in/sign-in.use-case.interface';
import { SignInUseCase } from '@app/application/user/commands/sign-in/sign-in.use-case';
import { IUserReadOnlyRepository } from '@app/application/user/repositories/user-read-only.repository.interface';
import { IJwt } from '@app/application/common/services/jwt';

@Module({
  imports: [
    ConfigModule.forFeature(userConfigFactory),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    UserRepository,
    {
      provide: IUserWriteOnlyRepository,
      useExisting: UserRepository,
    },
    {
      provide: IUserReadOnlyRepository,
      useExisting: UserRepository,
    },
    {
      provide: ICreateUserUseCase,
      inject: [IHash, IUserWriteOnlyRepository],
      useFactory: (hash: IHash, repository: IUserWriteOnlyRepository) =>
        new CreateUserUseCase(hash, repository),
    },
    {
      provide: ISignInUseCase,
      inject: [IHash, IUserReadOnlyRepository, IJwt],
      useFactory: (
        hash: IHash,
        repository: IUserReadOnlyRepository,
        jwt: IJwt,
      ) => new SignInUseCase(jwt, hash, repository),
    },
  ],
  controllers: [CreateUserController, SignInController],
})
export class UserModule {}
