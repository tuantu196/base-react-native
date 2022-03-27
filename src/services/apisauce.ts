import apisauce from 'apisauce';
import { API_URL } from 'src/environment/env';

const api = apisauce.create({ baseURL: API_URL });

export default api;
