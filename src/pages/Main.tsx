import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { getProfile } from '../api/auth';
import { createTodo, getTodo, updateTodo } from '../api/todo';
import Todo from '../components/Todo';
import todo from '../components/Todo';
import { AuthenticationContext } from '../context/AuthentificationContext';

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  padding: 40px 40px 40px 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DummyBox = styled.div`
  width: 200px;
`;

const CreateBox = styled.div`
  display: flex;
  gap: 10px;
`;

const LoginBox = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  border: 1px black solid;
  background-color: gray;
  color: white;
`;

const SubmitButton = styled.button`
  color: red;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
`;

const Modal = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

export type todoAttributeType = {
  todo: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type todosType = {
  id: number;
  attributes: todoAttributeType;
};

const Main = () => {
  const [todos, setTodos] = useState<todosType[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [profile, setProfile] = useState('');
  const [itemNumber, setItemNumber] = useState<number>();
  const [inputs, setInputs] = useState({
    createInput: '',
    editInput: '',
  });

  const { handleLogout, handleGetProfile } = useContext(AuthenticationContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTodo();
      const data = await response.json();
      setTodos([...data.data]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setProfile(handleGetProfile.name);
  }, []);

  const handleModal = async (id: number) => {
    setItemNumber(id);
    setIsModal(!isModal);
  };

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createTodo({ todo: inputs.createInput });
      const result = await response.json();
      setTodos(prevState => [...prevState, result.data]);
    } catch (e) {
      alert('양식에 맞게 모두 입력해주세요!');
    }
  };

  const handleUpdateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateTodo(itemNumber!, {
        todo: inputs.editInput,
      });
      const result = await response.json();
      const editedTodo = todos.find(todo => todo.id === itemNumber);
      editedTodo!.attributes = result.data.attributes;
      setTodos([...todos]);
      setIsModal(!isModal);
    } catch (e) {
      console.error('에러 발생');
    }
  };

  return (
    <Container>
      <Header>
        <DummyBox />
        <CreateBox>
          <form onSubmit={handleAddTodo}>
            <input
              placeholder="이름"
              name="createInput"
              value={inputs.createInput}
              onChange={onChange}
            />
            <SubmitButton type="submit" onClick={() => handleAddTodo}>
              생성하기
            </SubmitButton>
          </form>
        </CreateBox>
        <LoginBox>
          <div>어서오세요 {profile}님 </div>
          <Button onClick={handleLogout}>logout</Button>
        </LoginBox>
      </Header>
      <CategoryContainer>
        {todos.map((item, i) => (
          <Todo
            key={i}
            id={item.id}
            title={item.attributes.todo}
            setTodos={setTodos}
            onClick={() => handleModal(item.id)}
          />
        ))}
      </CategoryContainer>
      {isModal && (
        <Modal>
          <form onSubmit={handleUpdateTodo}>
            <input
              placeholder="수정할 내용을 적어주세요."
              type="text"
              value={inputs.editInput}
              name="editInput"
              onChange={onChange}
            />
            <SubmitButton type="submit" onClick={() => handleUpdateTodo}>
              수정하기
            </SubmitButton>
          </form>
          <div>모달임</div>
        </Modal>
      )}
    </Container>
  );
};

export default Main;
