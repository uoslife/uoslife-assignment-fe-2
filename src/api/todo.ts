import { KyResponse } from 'ky';
import { TODO_API } from '.';

export const createTodo: (input: string) => Promise<KyResponse> = async (
  input: string,
) => {
  return TODO_API.post('', { json: { data: { todo: input } } });
};

export const readTodo: () => Promise<KyResponse> = async () => {
  return TODO_API.get('');
};

export const updateTodo: (
  input: string,
  id: number,
) => Promise<KyResponse> = async (input: string, id: number) => {
  return TODO_API.put(`${id}`, { json: { data: { todo: input } } });
};

export const deleteTodo: (id: number) => Promise<KyResponse> = async (
  id: number,
) => {
  return TODO_API.delete(`${id}`);
};
