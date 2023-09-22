import { User } from '@app/domain/user/user';
import { Validator } from '@app/domain/common/validation/validator';
import { ValidationHandler } from '@app/domain/common/validation/validation-handler';

export class UserValidator extends Validator {
  constructor(
    handler: ValidationHandler,
    private readonly user: User,
  ) {
    super(handler);
  }

  validate(): void {
    if (!this.user.email.isValid()) {
      this.handler.append('email', 'must be an email');
    }
  }
}
