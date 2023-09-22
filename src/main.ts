import { NestFactory } from '@nestjs/core';

import { AppModule } from '@notion/app.module';
import { AppConfig } from '@notion/common/config';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<AppConfig>(AppConfig);

  app.setGlobalPrefix(config.api.prefix);

  await app.listen(config.port);
})();
