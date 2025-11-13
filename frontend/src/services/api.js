import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health check
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

// Users API
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Analytics API
export const getAnalytics = async () => {
  const response = await api.get('/analytics');
  return response.data;
};

export const getAnalyticsSummary = async () => {
  const response = await api.get('/analytics/summary');
  return response.data;
};

export const getAnalyticsByType = async (type) => {
  const response = await api.get(`/analytics/type/${type}`);
  return response.data;
};

export const createAnalytics = async (analyticsData) => {
  const response = await api.post('/analytics', analyticsData);
  return response.data;
};

export const deleteAnalytics = async (id) => {
  const response = await api.delete(`/analytics/${id}`);
  return response.data;
};

export default api;
