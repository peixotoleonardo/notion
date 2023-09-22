import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { IJwt } from '@app/application/common/services/jwt';

@Injectable()
export class JWTService implements IJwt {
  constructor(private readonly jwt: JwtService) {}

  sign(payload: Record<string, unknown>): Promise<string> {
    return this.jwt.signAsync(payload);
  }
}
