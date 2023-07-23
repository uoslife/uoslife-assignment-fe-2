import ky from 'ky';
const API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://api.escuelajs.co/api/v1',
});

const TODO_API = ky.create({
  timeout: 10 * 1000,
  prefixUrl: 'https://todo-assignment-cms.fly.dev/api/todos',
});

export { API, TODO_API };
