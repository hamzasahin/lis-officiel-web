
// Price formatting
export const formatPrice = (price, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(price);
  };
  
  // Date formatting
  export const formatDate = (date, formatOptions = { year: 'numeric', month: 'long', day: 'numeric' }) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString(undefined, formatOptions);
  };
  
  // Truncate text
  export const truncateText = (text, maxLength = 100, suffix = '...') => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength - suffix.length) + suffix;
  };
  
// src/utils/formatHelper.js

// ... (previous functions)

// Capitalize the first letter of a string
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  // Format phone number
  export const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  };
  
  // Get initials from a name
  export const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  };
  
  // Slugify a string
  export const slugify = (string) => {
    return string
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
// src/utils/validators.js

// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };
  
  // Password validation
  export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Phone number validation
  export const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };
  
  // Required field validation
  export const isRequired = (value) => {
    return value && value.trim().length > 0;
  };
  
  // Add more validation functions as needed
      