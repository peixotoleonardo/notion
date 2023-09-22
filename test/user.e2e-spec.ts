import request from 'supertest';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { AppModule } from '@notion/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it(`POST [${HttpStatus.CREATED}] - /users`, async () => {
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const password = faker.internet.password();

    const response = await request(app.getHttpServer())
      .post('/users')
      .send({ email, username, password })
      .set('Accept', 'application/json');

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body.email).toBe(email);
    expect(response.body.username).toBe(username);
  });

  afterAll(async () => {
    await app.close();
  });
});
