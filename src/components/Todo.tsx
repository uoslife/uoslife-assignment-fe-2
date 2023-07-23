import styled from 'styled-components';
import React, { SetStateAction } from 'react';
import { todosType } from '../pages/Main';
import { deleteTodo } from '../api/todo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const DeleteButton = styled.div`
  padding: 2px;
  border: 1px solid black;
`;

type createTodoType = {
  title: string;
  id: number;
  setTodos: React.Dispatch<SetStateAction<todosType[]>>;
  onClick: () => void;
};

const Todo = ({ title, id, setTodos, onClick }: createTodoType) => {
  const handleDeleteCategory = (id: number) => async () => {
    try {
      await deleteTodo(id);
    } catch (e) {
      console.error(e);
    }
    setTodos(prevState => prevState.filter(todo => todo.id !== id));
  };

  return (
    <Container>
      <TitleBox>
        <h3>{title}</h3>
        <DeleteButton onClick={onClick}>수정하기</DeleteButton>
        <DeleteButton onClick={handleDeleteCategory(id)}>삭제하기</DeleteButton>
      </TitleBox>
    </Container>
  );
};

export default Todo;
