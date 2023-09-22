import { User } from '@app/domain/user/user';

export const IUserWriteOnlyRepository = Symbol();

export interface IUserWriteOnlyRepository {
  add(user: User): Promise<void>;
}
