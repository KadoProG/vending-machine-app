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

/** CSRF Cookie のエンドポイントは API の prefix 外にあるため、オリジンから組み立てる */
const CSRF_COOKIE_URL = `${new URL(safeEnv.VITE_API_URL, window.location.origin).origin}/sanctum/csrf-cookie`;

/** CSRF トークンを要求される更新系のメソッド */
const CSRF_REQUIRED_METHODS = ['post', 'put', 'patch', 'delete'];

const hasCsrfCookie = () => document.cookie.includes('XSRF-TOKEN=');

/** 同時にリクエストが走った際に CSRF Cookie の取得が多重化しないよう共有する */
let csrfCookieRequest: Promise<void> | null = null;

const fetchCsrfCookie = async () => {
  if (hasCsrfCookie()) return;

  // 取得中のリクエストがあればそれを待つ
  csrfCookieRequest ??= axios
    .get(CSRF_COOKIE_URL, { withCredentials: true })
    .then(() => undefined)
    .finally(() => {
      csrfCookieRequest = null;
    });

  await csrfCookieRequest;
};

/**
 * 更新系のリクエストの前に Sanctum の CSRF Cookie を取得する。
 *
 * SPA からセッション認証を行う場合、POST などの前に CSRF Cookie が必要になる。
 * 各画面で都度呼び出すと漏れが生じるため、ここで一律に担保する。
 */
client.interceptors.request.use(async (config) => {
  if (CSRF_REQUIRED_METHODS.includes(config.method?.toLowerCase() ?? '')) {
    await fetchCsrfCookie();
  }

  return config;
});

export const apiClient = api(aspida(client));
