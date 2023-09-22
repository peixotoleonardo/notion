import { ValidationHandler } from '@app/domain/common/validation/validation-handler';

export abstract class Validator {
  get handler() {
    return this._handler;
  }

  constructor(private readonly _handler: ValidationHandler) {}

  abstract validate(): Promise<void> | void;
}
