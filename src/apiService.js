// src/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '', // 使用空字串以便能夠請求 `public` 目錄下的檔案
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCafes = async (city) => {
  try {
    // 假設你的 JSON 檔案位於 `public` 目錄下的 `/city.json`
    const response = await apiClient.get(`/data.json`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch cafes:', error);
    throw error;
  }
};
