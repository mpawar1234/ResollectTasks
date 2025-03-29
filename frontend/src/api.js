import axios from 'axios';

// Base API URL (replace with your Django server URL)
export const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});
