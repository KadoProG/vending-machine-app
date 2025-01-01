import api from '@/api/$api';
import { safeEnv } from '@/lib/env';
import aspida from '@aspida/axios';
import axios from 'axios';

const client = axios.create({
  baseURL: safeEnv.VITE_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
});

export const apiClient = api(aspida(client));
