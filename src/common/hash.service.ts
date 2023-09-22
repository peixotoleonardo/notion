import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { IHash } from '@app/application/common/services/hash';

@Injectable()
export class HashService implements IHash {
  compare(plaintext: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash);
  }

  hash(plaintext: string, salt: number): Promise<string> {
    return bcrypt.hash(plaintext, salt);
  }
}
