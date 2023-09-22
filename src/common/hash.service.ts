import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { IHash } from '@app/application/common/services/hash';

@Injectable()
export class HashService implements IHash {
  execute(plaintext: string, salt: number): Promise<string> {
    return bcrypt.hash(plaintext, salt);
  }
}
