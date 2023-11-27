import axios from 'axios';
import { environment } from '../environment/environment';

console.log(environment.REACT_APP_API_URL);

const api = axios.create({
  baseURL: environment.REACT_APP_API_URL,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

export default api;
