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

@Module({
  imports: [
    ConfigModule.forFeature(userConfigFactory),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    {
      provide: IUserWriteOnlyRepository,
      useClass: UserRepository,
    },
    {
      provide: ICreateUserUseCase,
      inject: [IHash, IUserWriteOnlyRepository],
      useFactory: (hash: IHash, repository: IUserWriteOnlyRepository) =>
        new CreateUserUseCase(hash, repository),
    },
  ],
  controllers: [CreateUserController],
})
export class UserModule {}
