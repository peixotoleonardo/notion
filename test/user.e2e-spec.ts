import request from 'supertest';
import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { makeApp } from './helpers/app.factory';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await makeApp()

    await app.init();
  });

  describe('POST /api/users', () => {
    it('send a valid request should create a user', async () => {
      const email = faker.internet.email();
      const username = faker.internet.userName();
      const password = faker.internet.password();

      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({ email, username, password })
        .set('Accept', 'application/json');

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.email).toBe(email);
      expect(response.body.username).toBe(username);
    });

    it.each([
      {
        request: {},
        message: [
          'email should not be empty',
          'email must be an email',
          'password should not be empty',
          'password must be a string',
          'username must be a string',
          'username should not be empty',
        ],
      },
    ])('send a invalid request should return 400', async (data) => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send(data.request)
        .set('Accept', 'application/json');

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.error).toBe('Bad Request');
      expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect((response.body.message as Array<string>).sort()).toStrictEqual(data.message.sort())
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
