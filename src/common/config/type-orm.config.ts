import Joi from 'joi';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs, ConfigType } from '@nestjs/config';

export const typeOrmConfigFactory = registerAs<TypeOrmModuleOptions>(
  'type-orm',
  () => ({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    autoLoadEntities: true,
  }),
);

export const TypeOrmConfig = typeOrmConfigFactory.KEY;

export type TypeOrmConfig = ConfigType<typeof typeOrmConfigFactory>;

export const TypeOrmConfigSchema = {
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
};
