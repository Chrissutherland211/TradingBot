import axios from 'axios';
import {API_URL, SERVER_KEY, API_KEY} from '../utils';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      return {
        headers: {
          'X-CoinAPI-Key': API_KEY,
        },
      };
    } catch (e) {
      // no token in local storage
      return config;
    }
  },
  (error) => Promise.reject(error),
);

const {get, post, put, delete: destroy} = apiClient;
export {get, post, put, destroy};
