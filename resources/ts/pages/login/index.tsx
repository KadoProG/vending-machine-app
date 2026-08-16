import { Button } from '@/components/button/Button';
import { TextField } from '@/components/input/TextField';
import { useAuthUser } from '@/hooks/useAuthUser';
import { apiClient } from '@/lib/apiClient';
import { toErrorMessage } from '@/lib/apiError';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

type LoginForm = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isLoading, mutate } = useAuthUser();

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
  });

  /** ログイン後に戻る先。未指定の場合はトップへ */
  const redirectTo = searchParams.get('redirect') ?? '/';

  // すでにログイン済みの場合は遷移先へ飛ばす
  React.useEffect(() => {
    if (!isLoading && user) {
      navigate(redirectTo, { replace: true });
    }
  }, [isLoading, user, navigate, redirectTo]);

  const onSubmit = handleSubmit(async (values) => {
    setErrorMessage(null);

    try {
      await apiClient.login.$post({
        body: {
          email: values.email,
          password: values.password,
        },
      });

      // ログイン後のユーザー情報を再取得してから遷移する
      await mutate();

      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErrorMessage(toErrorMessage(error, 'ログインに失敗しました'));
    }
  });

  if (isLoading) {
    return <p style={{ padding: 8 }}>読み込み中...</p>;
  }

  return (
    <div style={{ padding: 8 }}>
      <h1>ログイン</h1>

      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}
      >
        <TextField
          control={control}
          name="email"
          label="メールアドレス"
          type="email"
          autoComplete="email"
          autoFocus
          required
        />

        <TextField
          control={control}
          name="password"
          label="パスワード"
          type="password"
          autoComplete="current-password"
          required
        />

        {errorMessage && <p style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{errorMessage}</p>}

        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'ログイン中...' : 'ログイン'}
          </Button>
          <Button href="/">トップへ戻る</Button>
        </div>
      </form>
    </div>
  );
};
