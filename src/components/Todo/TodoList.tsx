import { useEffect, useState } from 'react';
import { getTodo } from '../../api';
import { TodoType } from '../../types/todo.type';

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
    </div>
  );
};
