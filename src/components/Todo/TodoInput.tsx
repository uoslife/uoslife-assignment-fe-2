import { useState } from 'react';

export const TodoInput = ({ loadTodos }: { loadTodos: () => {} }) => {
  const [input, setInput] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loadTodos();
  };

  return (
    <form>
      <input onChange={onChange} value={input} />
      <button>ADD TODO</button>
    </form>
  );
};
