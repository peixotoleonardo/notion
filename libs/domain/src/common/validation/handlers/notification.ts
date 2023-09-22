import { ValidationHandler } from '@app/domain/common/validation/validation-handler';

export class Notification extends ValidationHandler {
  get errors() {
    return this._errors;
  }

  constructor(private readonly _errors: Record<string, string[]> = {}) {
    super();
  }

  append(field: string, error: string): ValidationHandler {
    this._errors[field]?.push(error);

    return this;
  }
}
