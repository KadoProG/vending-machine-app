import axios from 'axios';

/**
 * API のエラーレスポンスから表示用のメッセージを取り出す。
 *
 * Laravel のバリデーションエラー（422）は errors に項目ごとの配列が入るため、
 * 先頭のメッセージを連結して返す。
 */
export const toErrorMessage = (error: unknown, fallback: string): string => {
  if (!axios.isAxiosError(error)) return fallback;

  const data = error.response?.data as
    { message?: string; errors?: Record<string, string[]> } | undefined;

  if (data?.errors) {
    const messages = Object.values(data.errors).flat();
    if (messages.length > 0) return messages.join('\n');
  }

  return data?.message ?? fallback;
};
