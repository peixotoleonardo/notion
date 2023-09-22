import isEmail from 'validator/lib/isEmail';

export class Email {
  get value() {
    return this._value;
  }

  constructor(private readonly _value: string) {}

  static with(value: string) {
    return new this(value);
  }

  isValid() {
    return typeof this._value === 'string' && isEmail(this._value);
  }
}
