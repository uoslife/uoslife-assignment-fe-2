import React, { useState } from 'react';
import { deleteTodo, updateTodo } from '../api/todo';

const TodoItem = ({ text, id }: any) => {
  const [input, setInput] = useState(text);
  const handleTodoItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClickUpdate = async () => {
    if (input === '') {
      alert('글자를 입력하시오.');
    } else {
      await (await updateTodo(input, id)).json();
    }
  };

  const onClickDelte = async () => {
    await (await deleteTodo(id)).json();
    window.location.reload();
  };

  return (
    <div>
      <input value={input} type="text" onChange={handleTodoItemChange} />
      <button onClick={onClickUpdate}>Edit</button>
      <button onClick={onClickDelte}>Delete</button>
    </div>
  );
};

export default TodoItem;
