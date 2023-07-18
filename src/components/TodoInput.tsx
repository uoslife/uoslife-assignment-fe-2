import { useState } from 'react';
import { createTodo } from '../api/todo';

const TodoInput = () => {
  const [todo, setTodo] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const onSubmit = async () => {
    if (todo === '') {
      alert('글자를 입력하시오.');
    } else {
      await (await createTodo(todo)).json();
      setTodo('');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={todo}
        onChange={onChange}
        type="text"
        placeholder="Write your To do"
      />
      <button>Add To do</button>
      <hr />
    </form>
  );
};

export default TodoInput;
