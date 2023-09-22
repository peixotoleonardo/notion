import Joi from 'joi';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigType, registerAs } from '@nestjs/config';

export const jwtConfigFactory = registerAs<JwtModuleOptions>('jwt', () => ({
  secret: process.env.JWT_SECRET,
}));

export const JwtConfig = jwtConfigFactory.KEY;

export type JwtConfig = ConfigType<typeof jwtConfigFactory>;

export const JwtConfigSchema = {
  JWT_SECRET: Joi.string().required(),
};
