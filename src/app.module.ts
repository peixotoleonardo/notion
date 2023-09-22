import Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '@notion/common/common.module';
import { UserModule, UserConfigSchema } from '@notion/user';
import {
  TypeOrmConfig,
  typeOrmConfigFactory,
  TypeOrmConfigSchema,
  AppConfigSchema,
  appConfigFactory,
  JwtConfigSchema,
  jwtConfigFactory,
} from '@notion/common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfigFactory, appConfigFactory, typeOrmConfigFactory],
      validationSchema: Joi.object({
        ...UserConfigSchema,
        ...TypeOrmConfigSchema,
        ...AppConfigSchema,
        ...JwtConfigSchema,
      }),
      ...(process.env.NODE_ENV === 'test'
        ? {
            envFilePath: '.env.e2e',
          }
        : {}),
    }),
    TypeOrmModule.forRootAsync({
      inject: [TypeOrmConfig],
      useFactory: (config: TypeOrmConfig) => config,
    }),
    CommonModule,
    UserModule,
  ],
})
export class AppModule {}
