import axios from 'axios';

export interface User {
  id: string;
  username: string;
  avatar: string;
}

export const fetchUsers = async (query: string): Promise<User[]> => {
  const response = await axios.get('/api/users', { params: { query } });
  return response.data;
};