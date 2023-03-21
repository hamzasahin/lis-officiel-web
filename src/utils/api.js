import axios from 'axios';

const API_BASE_URL = 'https://your-backend-api-url.com';

export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

// Add more API helper functions here
