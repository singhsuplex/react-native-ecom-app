import axios from 'axios';

// const ProductURL = 'http://10.0.2.2:3000/product';
const ProductURL = 'https://maa-tulya-ecom-mern-backend-app.onrender.com/api/v1/product';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(ProductURL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

