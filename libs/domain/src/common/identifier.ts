import { randomUUID } from 'node:crypto';

export class Identifier {
  get value() {
    return this._value;
  }

  private constructor(private readonly _value: string) {}

  static unique() {
    return new this(randomUUID());
  }
}
