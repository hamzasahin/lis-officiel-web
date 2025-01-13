// src/utils/apiHelper.js
import api from './api';

// Categories
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Products
export const getProducts = async (categoryId) => {
  try {
    const response = await api.get(`/products?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Cart
export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await api.post('/cart', { userId, productId, quantity });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCart = async (userId, productId, quantity) => {
  try {
    const response = await api.put('/cart', { userId, productId, quantity });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCartItems = async (userId) => {
  try {
    const response = await api.get(`/cart?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Orders
export const createOrder = async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const getOrderDetails = async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const getUserOrders = async (userId) => {
    try {
      const response = await api.get(`/orders?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // User
  export const loginUser = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const registerUser = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateUserDetails = async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Wishlist
export const addToWishlist = async (userId, productId) => {
    try {
      const response = await api.post('/wishlist', { userId, productId });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const removeFromWishlist = async (userId, productId) => {
    try {
      const response = await api.delete('/wishlist', { data: { userId, productId } });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const getWishlistItems = async (userId) => {
    try {
      const response = await api.get(`/wishlist?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Admin
  export const getAllOrders = async () => {
    try {
      const response = await api.get('/admin/orders');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await api.put(`/admin/orders/${orderId}`, { status });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Password Reset
  export const requestPasswordReset = async (email) => {
    try {
      const response = await api.post('/auth/password-reset', { email });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const resetPassword = async (token, newPassword) => {
    try {
      const response = await api.put('/auth/password-reset', { token, newPassword });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // src/utils/apiHelper.js

// ... (previous functions)

// FAQ
export const getFAQs = async () => {
    try {
      const response = await api.get('/faqs');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Contact Us
  export const submitContactForm = async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Product Search
  export const searchProducts = async (searchQuery) => {
    try {
      const response = await api.get(`/products/search?query=${searchQuery}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Admin - Categories
export const createCategory = async (categoryData) => {
    try {
      const response = await api.post('/admin/categories', categoryData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateCategory = async (categoryId, categoryData) => {
    try {
      const response = await api.put(`/admin/categories/${categoryId}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteCategory = async (categoryId) => {
    try {
      const response = await api.delete(`/admin/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Admin - Products
  export const createProduct = async (productData) => {
    try {
      const response = await api.post('/admin/products', productData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateProduct = async (productId, productData) => {
    try {
      const response = await api.put(`/admin/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteProduct = async (productId) => {
    try {
      const response = await api.delete(`/admin/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Admin - User Inquiries (Contact Us)
export const getUserInquiries = async () => {
    try {
      const response = await api.get('/admin/inquiries');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateInquiryStatus = async (inquiryId, status) => {
    try {
      const response = await api.put(`/admin/inquiries/${inquiryId}`, { status });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  // Admin - User Management
  export const getAllUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateUserRole = async (userId, role) => {
    try {
      const response = await api.put(`/admin/users/${userId}`, { role });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteUser = async (userId) => {
    try {
      const response = await api.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };