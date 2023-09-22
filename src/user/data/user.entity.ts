import { Entity, Column } from 'typeorm';

import { BaseEntity } from '@notion/common/data/base-entity';
import { User } from '@app/domain/user/user';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  token: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  image?: string;

  toDomain() {
    return User.with(
      this.id,
      this.email,
      this.token,
      this.username,
      this.bio,
      this.image,
    );
  }
}
