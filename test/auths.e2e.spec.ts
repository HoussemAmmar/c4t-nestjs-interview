import { BeforeAll } from './beforeAll';
import * as request from 'supertest';

describe('Auth e2e test', () => {
  let app;
  let server: BeforeAll;

  beforeAll(async () => {
    server = new BeforeAll();
    app = await server.createApp();
  });

  afterAll(async () => {
    server.close().then();
  });

  it('Login a', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'houssem@gmail.com',
        password: '123456',
      })
      .expect(201);
    expect(response.body.data.access_token).toBeTruthy();
    expect(response.body.message).toEqual('LOGIN_SUCCEEDED');
  });
});
