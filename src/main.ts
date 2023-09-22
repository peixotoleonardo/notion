import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@notion/app.module';
import { AppConfig } from '@notion/common/config';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<AppConfig>(AppConfig);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(config.api.prefix);

  await app.listen(config.port);
})();
