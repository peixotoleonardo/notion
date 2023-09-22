import { User } from '@app/domain/user/user';

export const IUserReadOnlyRepository = Symbol();

export type Where = {
  email: string;
};

export type Select = {
  token: boolean;
};

export interface IUserReadOnlyRepository {
  get(query: Partial<Where>, select?: Partial<Select>): Promise<User>;
}
