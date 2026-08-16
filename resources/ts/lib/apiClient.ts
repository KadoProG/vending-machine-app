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

/**
 * Sanctum の CSRF Cookie を取得する。
 *
 * SPA からセッション認証を行う場合、ログインなどの POST の前に必ず呼び出す必要がある。
 * CSRF Cookie のエンドポイントは API の prefix 外にあるため、オリジンから組み立てる。
 */
export const fetchCsrfCookie = async () => {
  const origin = new URL(safeEnv.VITE_API_URL, window.location.origin).origin;

  await client.get(`${origin}/sanctum/csrf-cookie`);
};
