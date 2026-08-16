import { apiClient } from '@/lib/apiClient';
import useSWR from 'swr';

const fetcher = async () => {
  const response = await apiClient.v1.user.$get();
  return response;
};

/**
 * ログイン中のユーザーを取得する。
 *
 * 未ログインの場合は 401 が返るため、user は undefined になる。
 */
export const useAuthUser = () => {
  const { data, error, isLoading, mutate } = useSWR({ key: '/v1/user' }, fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
  });

  return {
    user: data?.data,
    isLoading,
    isGuest: !isLoading && (!!error || !data),
    mutate,
  };
};
