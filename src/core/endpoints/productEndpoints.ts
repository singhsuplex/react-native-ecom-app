import client from '../Interceptors/interceptor';

// Fetch posts
export const fetchProducts = async () => {
  const response = await client.get('/api/v1/product');      
  return response.data;
};


// Create a new post
// export const createPost = async (product : any) => {
//   const response = await client.post('/api/v1/product', product);
//   return response.data;
// };
