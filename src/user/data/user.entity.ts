import { Entity, Column } from 'typeorm';

import { BaseEntity } from '@notion/common/data/base-entity';

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
}
