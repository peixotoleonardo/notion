import Joi from 'joi';
import { ConfigType, registerAs } from '@nestjs/config';

export const appConfigFactory = registerAs('app', () => ({
  port: +process.env.APP_PORT,
  api: {
    prefix: process.env.APP_API_PREFIX,
  },
}));

export const AppConfig = appConfigFactory.KEY;

export type AppConfig = ConfigType<typeof appConfigFactory>;

export const AppConfigSchema = {
  APP_PORT: Joi.number().required(),
  APP_API_PREFIX: Joi.string().default('api'),
};
