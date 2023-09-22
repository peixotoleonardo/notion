import isEmail from 'validator/lib/isEmail';

export class Email {
  get value() {
    return this._value;
  }

  constructor(private readonly _value: string) {}

  isValid() {
    return typeof this._value === 'string' && isEmail(this._value);
  }
}
