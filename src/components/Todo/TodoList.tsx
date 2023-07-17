import { useCallback, useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { TodoItemType } from '../../types/todo.type';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const loadTodos = useCallback(async () => {
    const res = (await (await getTodos()).json()) as any;
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
      <TodoInput />
      {todos &&
        todos.map(todoItem => (
          <TodoItem key={todoItem.id} todoItem={todoItem} />
        ))}
    </div>
  );
};
