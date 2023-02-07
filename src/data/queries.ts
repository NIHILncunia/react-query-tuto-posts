import axios from 'axios';
import { ITodo, IUser } from '@/types/todos.types';

const baseUrl = 'https://my-json-server.typicode.com/NIHILncunia/json-server-test';

export const getTodos = async () => {
  const { data, } = await axios.get<ITodo[]>(`${baseUrl}/todos`);

  return data;
};

export const getPageTodos = async (currentPage: number) => {
  const { data, } = await axios.get<ITodo[]>(`${baseUrl}/todos?_limit=2&_page=${currentPage}`);

  return data;
};

export const getTodo = async (id: string) => {
  const { data, } = await axios.get<ITodo>(`${baseUrl}/todos/${id}`);

  return data;
};

export const getUsers = async () => {
  const { data, } = await axios.get<IUser[]>(`${baseUrl}/users`);

  return data;
};
