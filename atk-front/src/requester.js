import axios from 'axios';

const base =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE
    ? process.env.NEXT_PUBLIC_API_BASE.replace(/\/+$/, '') + '/'
    : 'http://localhost:8000/ru/api/v1/';

export const API = axios.create({
  baseURL: base,
});
