// Authentication utility functions

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get user from localStorage
export const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Set auth header for axios
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Check if user is admin
export const isAdmin = () => {
  const user = getUser();
  return user && user.role === "admin";
};

