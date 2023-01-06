import { BeforeAll } from './beforeAll';

jest.setTimeout(300000);

describe('Movie e2e test', () => {
  let app;
  let server: BeforeAll;

  beforeAll(async () => {
    server = new BeforeAll();
    app = await server.createApp();
  });

  afterAll(async () => {
    server.close().then();
  });
});
