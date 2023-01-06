import { BeforeAll } from './beforeAll';
import * as request from 'supertest';
import { Types } from 'mongoose';
import { getRandomString } from './utils/test.utils';

jest.setTimeout(300000);

describe('Movie e2e test', () => {
  let app;
  let server: BeforeAll;
  let jwtToken;
  let id: Types.ObjectId;

  beforeAll(async () => {
    server = new BeforeAll();
    app = await server.createApp();
  });

  afterAll(async () => {
    server.close().then();
  });

  it('Login', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'janick@gmail.com',
        password: '123456',
      })
      .expect(201);
    expect(response.body.data.access_token).toBeTruthy();
    expect(response.body.message).toEqual('LOGIN_SUCCEEDED');
    jwtToken = response.body.data.access_token;
  });

  it('Get movies', async () => {
    const response = await request(app.getHttpServer())
      .get('/movies')
      .expect(200);

    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.message).toEqual('FOUND_MOVIE');
  });

  it('create a movie', async () => {
    const response = await request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Barry Lyndon',
        description: 'string',
        releaseDate: '1975-01-04T16:25:02',
        rating: 4,
        genre: 'Drama',
        actorsName: ['actor1', 'actor2'],
        poster: 'string',
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(201);
    expect(response.body.message).toEqual('CREATED_MOVIE');
    expect(response.body.data).toHaveProperty('title', 'Barry Lyndon');
    id = response.body.data._id;
  });

  it('create a movie with a release date in the future', async () => {
    const response = await request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Barry Lyndon',
        description: 'string',
        releaseDate: '2023-05-04T16:25:02',
        rating: 4,
        genre: 'Drama',
        actorsName: ['actor1', 'actor2'],
        poster: 'string',
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400);
    expect(response.body.message).toEqual('Release date must be in the past');
  });

  it('create a movie with title longer that 120 letters and description longer that 500 letters', async () => {
    const response = await request(app.getHttpServer())
      .post('/movies')
      .send({
        title: getRandomString(122),
        description: getRandomString(510),
        releaseDate: '2023-05-04T16:25:02',
        rating: 4,
        genre: 'Drama',
        actorsName: ['actor1', 'actor2'],
        poster: 'string',
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400);
    expect(response.body.message[0]).toEqual(
      'title must be shorter than or equal to 120 characters',
    );
    expect(response.body.message[1]).toEqual(
      'description must be shorter than or equal to 500 characters',
    );
  });

  it('update a movie', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/movies/${id}`)
      .send({ description: 'new description' })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
    expect(response.body.data).toHaveProperty('title', 'Barry Lyndon');
    expect(response.body.data).toHaveProperty('description', 'new description');
  });

  it('update a movie with a title longer that 120 letters and description longer that 500 letters', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/movies/${id}`)
      .send({
        title: getRandomString(122),
        description: getRandomString(510),
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400);
    expect(response.body.message[0]).toEqual(
      'title must be shorter than or equal to 120 characters',
    );
    expect(response.body.message[1]).toEqual(
      'description must be shorter than or equal to 500 characters',
    );
  });

  it('update a movie with a release date in the future', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/movies/${id}`)
      .send({
        releaseDate: '2024-05-04T16:25:02',
      })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(400);
    expect(response.body.message).toEqual('Release date must be in the past');
  });

  it('delete movie', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/movies/${id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
    expect(response.body.data).toHaveProperty('title', 'Barry Lyndon');
  });

  it('delete a non existing movie', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/movies/${id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
    expect(response.body.message).toEqual(`NOT_FOUND_MOVIE ID-(${id})`);
  });

  it('update a non existing movie ', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/movies/${id}`)
      .send({ description: 'new description' })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
    expect(response.body.message).toEqual(`NOT_FOUND_MOVIE ID-(${id})`);
  });
});
