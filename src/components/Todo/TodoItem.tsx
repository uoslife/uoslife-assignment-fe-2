import { useCallback, useState } from 'react';
import { TodoItemType } from '../../types/todo.type';
import { deleteTodo, putTodo } from '../../api';

export const TodoItem = ({ todoItem }: { todoItem: TodoItemType }) => {
  const [input, setInput] = useState<string>(todoItem.attributes.todo);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const onDelete = useCallback(async () => {
    await deleteTodo(todoItem.id);

    window.location.reload();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) {
      alert('비어있음');
      return;
    }

    await putTodo(input, todoItem.id);

    window.location.reload();
  };

  return (
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={input}></input>
      <button>수정</button>
      <button type="button" onClick={onDelete}>
        삭제
      </button>
    </form>
  );
};
