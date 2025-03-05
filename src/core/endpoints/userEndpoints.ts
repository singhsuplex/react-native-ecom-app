import client from '../Interceptors/interceptor';

// Fetch posts
export const login = async (credentials : any) => {
  const response = await client.post('/api/auth/login', credentials);      
  return response.data;
};