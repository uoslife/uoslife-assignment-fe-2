import styled from 'styled-components';
import { deleteCategory } from '../api/category';
import React, { SetStateAction } from 'react';
import { categoryType } from '../pages/Main';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.div`
  padding: 2px;
  border: 1px solid black;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
`;

type createCategoryType = {
  name: string;
  image: string;
  id: number;
  setCategory: React.Dispatch<SetStateAction<categoryType[]>>;
};

const Category = ({ name, image, id, setCategory }: createCategoryType) => {
  const handleDeleteCategory = (id: number) => async () => {
    try {
      await deleteCategory(id);
    } catch (e) {
      console.error(e);
    }
    setCategory(prevState =>
      prevState.filter(category => parseInt(category.id) !== id),
    );
  };

  return (
    <Container>
      <TitleBox>
        <h3>{name}</h3>
        <DeleteButton onClick={handleDeleteCategory(id)}>삭제하기</DeleteButton>
      </TitleBox>
      <Image src={image} alt={name} />
    </Container>
  );
};

export default Category;
