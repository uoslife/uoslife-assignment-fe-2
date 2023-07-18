// import style from './TodoBoard.module.css';
import { useCallback, useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import { readTodo } from '../api/todo';
import TodoItem from './TodoItem';
import TodoListStyle from './TodoListStylr';

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
      <TodoListStyle>
        <h1>To Do List</h1>
        {todoList.map((item: any) => (
          <div key={item.id}>
            <TodoItem text={item.attributes.todo} id={item.id} />
          </div>
        ))}
      </TodoListStyle>
    </>
  );
};

export default TodoList;
