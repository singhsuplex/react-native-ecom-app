import client from '../Interceptors/interceptor';
// Fetch posts
export const fetchBanners = async () => {
  const response = await client.get('/api/v1/banner');      
  return response.data;
};