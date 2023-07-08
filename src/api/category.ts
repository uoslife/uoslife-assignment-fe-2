import API from './index';

export type createCategoryRequest = {
  name: string;
  image: string;
};

const getCategory = async (): Promise<Response> => {
  return API.get('categories');
};

const createCategory = async (
  data: createCategoryRequest,
): Promise<Response> => {
  return API.post('categories', { json: data });
};

const deleteCategory = async (params: number): Promise<Response> => {
  return API.delete(`categories/${params}`);
};

export { getCategory, createCategory, deleteCategory };
