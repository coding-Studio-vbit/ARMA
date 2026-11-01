import axios from './axios';

const TOKEN_KEY = 'adminToken';
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const setAuthToken = (token: string) => {
  const expiryTime = Date.now() + TOKEN_EXPIRY;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem('tokenExpiry', expiryTime.toString());
};

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem('tokenExpiry');
  
  if (!token || !expiry) return null;
  
  // Check if token has expired
  if (Date.now() > parseInt(expiry)) {
    clearAuthToken();
    return null;
  }
  
  return token;
};

export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('tokenExpiry');
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

// Add axios interceptor to handle 401 responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
); 