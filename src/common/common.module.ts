import { Global, Module } from '@nestjs/common';

import { IHash } from '@app/application/common/services/hash';

import { HashService } from '@notion/common/hash.service';

@Global()
@Module({
  providers: [
    {
      provide: IHash,
      useClass: HashService,
    },
  ],
  exports: [IHash],
})
export class CommonModule {}
