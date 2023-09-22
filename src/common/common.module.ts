import { JwtModule } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';

import { IJwt } from '@app/application/common/services/jwt';
import { IHash } from '@app/application/common/services/hash';

import { JWTService } from '@notion/common/jwt.service';
import { HashService } from '@notion/common/hash.service';
import { ConfigModule } from '@nestjs/config';
import { JwtConfig } from '@notion/common/config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [JwtConfig],
      useFactory: (config) => config,
    }),
  ],
  providers: [
    {
      provide: IHash,
      useClass: HashService,
    },
    {
      provide: IJwt,
      useClass: JWTService,
    },
  ],
  exports: [IHash, IJwt],
})
export class CommonModule {}
