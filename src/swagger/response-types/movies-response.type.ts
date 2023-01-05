export const MoviesResponseType = {
  title: { type: 'string' },
  description: { type: 'string' },
  releaseDate: {
    type: 'string',
    format: 'date',
  },
  rating: { type: 'number' },
  genre: { type: 'string' },
  actorsName: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  poster: { type: 'string' },
};
