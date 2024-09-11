// src/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // 使用 proxy 設置的 API 路徑
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCafes = async (city) => {
  try {
    const response = await apiClient.get(`/${city}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cafes:', error);
    throw error;
  }
};
