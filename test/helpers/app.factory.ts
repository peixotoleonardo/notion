import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@notion/app.module';
import { AppConfig } from '@notion/common/config';

export const makeApp = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  const config = app.get<AppConfig>(AppConfig);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(config.api.prefix);

  app.useGlobalPipes();

  return app;
};
