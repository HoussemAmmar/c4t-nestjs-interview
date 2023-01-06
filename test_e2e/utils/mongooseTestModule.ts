import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoClient, ObjectId } from 'mongodb';
import fs = require('fs');
import path = require('path');

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      const client = await MongoClient.connect(options.uri);
      const db = client.db('c4t-test_e2e');

      const moviesJson = fs.readFileSync(
        path.resolve(__dirname, '../data/movies.json'),
      );
      const moviesData = JSON.parse(moviesJson.toString());
      const movies = moviesData.map((movie) => {
        const m = movie;
        m._id = ObjectId.createFromHexString(movie._id);
        m.releaseDate = new Date(movie.releaseDate);
        m.createdAt = new Date(movie.createdAt);
        m.updatedAt = new Date(movie.updatedAt);
        return m;
      });
      await db.collection('movies').insertMany(movies);

      const authsJson = fs.readFileSync(
        path.resolve(__dirname, '../data/auths.json'),
      );
      const authsData = JSON.parse(authsJson.toString());
      const auths = authsData.map((auth) => {
        const a = auth;
        a._id = ObjectId.createFromHexString(auth._id);
        a.createdAt = new Date(auth.createdAt);
        a.updatedAt = new Date(auth.updatedAt);
        return a;
      });
      await db.collection('auths').insertMany(auths);

      await client.close();

      options.uri += 'c4t-test_e2e';
      return options;
    },
  });
