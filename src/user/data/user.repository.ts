import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@app/domain/user/user';

import { IUserWriteOnlyRepository } from '@app/application/user/repositories/user-write-only.repository.interface';

import { UserEntity } from '@notion/user/data/user.entity';

@Injectable()
export class UserRepository implements IUserWriteOnlyRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async add(user: User): Promise<void> {
    const entity = this.repository.create({
      id: user.id.value,
      email: user.email.value,
      token: user.token,
      username: user.username,
    });

    await this.repository.save(entity);
  }
}
