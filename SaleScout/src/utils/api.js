import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getBackendData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Ошибка получения данных', error);
  }
};
