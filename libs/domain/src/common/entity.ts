import { Identifier } from '@app/domain/common/identifier';

export abstract class Entity {
  protected constructor(protected readonly _id: Identifier) {}

  get id() {
    return this._id;
  }
}
