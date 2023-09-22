import { Identifier } from '@app/domain/common/identifier';
import { ValidationHandler } from '@app/domain/common/validation/validation-handler';

export abstract class Entity {
  protected constructor(protected readonly _id: Identifier) {}

  abstract validate(handler: ValidationHandler): Promise<void>;

  get id() {
    return this._id;
  }
}
