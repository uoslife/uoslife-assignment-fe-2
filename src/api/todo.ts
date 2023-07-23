import { TODO_API } from './index';

export type createTodoRequest = {
  todo: string;
};

const getTodo = async (): Promise<Response> => {
  return TODO_API.get('');
};

const createTodo = async (data: createTodoRequest): Promise<Response> => {
  return TODO_API.post('', { json: { data } });
};

const updateTodo = async (
  params: number,
  data: createTodoRequest,
): Promise<Response> => {
  return TODO_API.put(`${params}`, { json: { data } });
};

const deleteTodo = async (params: number): Promise<Response> => {
  return TODO_API.delete(`${params}`);
};

export { getTodo, createTodo, updateTodo, deleteTodo };
