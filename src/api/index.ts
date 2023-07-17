import ky from 'ky';

export const API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://api.escuelajs.co/api/v1',
  hooks: {
    afterResponse: [
      () => {
        //
      },
    ],
  },
});

export const TODO_API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://todo-assignment-cms.fly.dev/api/todos',
});
