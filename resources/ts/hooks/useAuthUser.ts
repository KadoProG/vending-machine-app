import { apiClient } from '@/lib/apiClient';
import useSWR from 'swr';

const fetcher = async () => {
  const response = await apiClient.v1.users.me.$get();
  return response;
};

/**
 * ログイン中のユーザーを取得する。
 *
 * 未ログインの場合は 401 が返るため、user は undefined になる。
 */
export const useAuthUser = () => {
  const { data, error, isLoading, mutate } = useSWR({ key: '/v1/users/me' }, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  // 401 が返った場合 SWR は直前の data を保持したままになるため、
  // エラー時は未ログインとして扱う
  const user = error ? undefined : data?.data;

  return {
    user,
    isLoading,
    isGuest: !isLoading && !user,
    mutate,
  };
};
