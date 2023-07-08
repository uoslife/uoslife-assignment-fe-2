import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { createCategory, getCategory } from '../api/category';
import Category from '../components/Category';

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

const CategoryContainer = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 50px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export type categoryType = {
  id: string;
  name: string;
  image: string;
  creationAt: string;
  updateAt: string;
};

const Main = () => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [inputs, setInputs] = useState({
    name: '',
    image: 'https://picsum.photos/640/640?r=7295',
  });

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
      const response = await getCategory();
      const data = await response.json();
      setCategories(data);
    };

    fetchData();
  }, []);

  const handleLogOut = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    if (!localStorage.getItem('access_token')) {
      navigate('/login');
      alert('로그아웃에 성공하셨습니다.');
    }
  };

  const handleCreateCategory = async () => {
    try {
      const response = await createCategory({
        name: inputs.name,
        image: inputs.image,
      });
      const result = await response.json();
      setCategories(prevState => [...prevState, result]);
    } catch (e) {
      alert('양식에 맞게 모두 입력해주세요!');
    }
  };

  return (
    <Container>
      <Header>
        <DummyBox />
        <CreateBox>
          <input
            name="name"
            placeholder="이름"
            value={inputs.name}
            onChange={onChange}
          />
          <input
            name="image"
            type="url"
            placeholder="사진의 url을 입력해주세요"
            value={inputs.image}
            onChange={onChange}
          />
          <Button onClick={handleCreateCategory}>생성하기</Button>
        </CreateBox>
        <LoginBox>
          <div>로그인에 성공하셨습니다.</div>
          <Button onClick={handleLogOut}>logout</Button>
        </LoginBox>
      </Header>
      <CategoryWrapper>
        <CategoryContainer>
          {categories.map((item, i) => (
            <Category
              key={i}
              name={item.name}
              image={item.image}
              id={parseInt(item.id)}
              setCategory={setCategories}
            />
          ))}
        </CategoryContainer>
      </CategoryWrapper>
    </Container>
  );
};

export default Main;
