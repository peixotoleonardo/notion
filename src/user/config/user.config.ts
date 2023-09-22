import Joi from 'joi';
import { registerAs, ConfigType } from '@nestjs/config';

export const userConfigFactory = registerAs('user', () => ({
  salt: +process.env.USER_PASSWORD_SALT,
}));

export const UserConfig = userConfigFactory.KEY;

export type UserConfig = ConfigType<typeof userConfigFactory>;

export const UserConfigSchema = {
  USER_PASSWORD_SALT: Joi.number().default(10),
};
