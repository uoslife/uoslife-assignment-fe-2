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
