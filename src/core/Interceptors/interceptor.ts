import axios from 'axios';

// Set up the Axios client with base URL and default headers
const client = axios.create({
  baseURL: 'https://maa-tulya-ecom-mern-backend-app.onrender.com', // Example base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add authorization token or log requests
client.interceptors.request.use(
  (config) => {
    // Example: Add token to headers (if needed)
    // config.headers.Authorization = `Bearer ${token}`;
    console.log('Request:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle response errors globally
client.interceptors.response.use(
  (response) => {
    // Handle response before returning (e.g., log it, format data)
    console.log('Response:', response);
    return response;
  },
  (error) => {
    // Global error handling (e.g., show notification, logging)
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default client;
