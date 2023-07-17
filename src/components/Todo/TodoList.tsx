import { useCallback, useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { TodoType } from '../../types/todo.type';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const loadTodos = useCallback(async () => {
    const res = (await getTodos()).json() as any;
    const { data } = res;

    console.log('Todo Data Loaded: ', data);
    setTodos(data);
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <TodoInput loadTodos={loadTodos} />
      {todos.map(todo => (
        <TodoItem todo={todo} />
      ))}
    </div>
  );
};
