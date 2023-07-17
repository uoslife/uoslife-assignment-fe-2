import { useCallback, useState } from 'react';
import { postTodo } from '../../api';

export const TodoInput = () => {
  const [input, setInput] = useState<string>('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) {
      alert('비어있음');
      return;
    }

    await postTodo(input);

    window.location.reload();
  };

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="할일을입력하세요" onChange={onChange} value={input} />
      <button>ADD TODO</button>
    </form>
  );
};
