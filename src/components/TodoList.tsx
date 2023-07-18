// import style from './TodoBoard.module.css';
import { useCallback, useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import { readTodo } from '../api/todo';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);

  const readList = useCallback(async () => {
    const response = await (await readTodo()).json();
    const { data } = response as any;
    setTodoList(data);
  }, []);

  useEffect(() => {
    readList();
  });

  return (
    <>
      <TodoInput />
      <div>
        <h1>To Do List</h1>
        {todoList.map((item: any) => (
          <div key={item.id}>
            <TodoItem text={item.attributes.todo} id={item.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
