import { Button } from '@/components/button/Button';
import { TextArea } from '@/components/input/TextArea';
import { TextField } from '@/components/input/TextField';
import { useAuthUser } from '@/hooks/useAuthUser';
import { apiClient } from '@/lib/apiClient';
import { toErrorMessage } from '@/lib/apiError';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

type MerchandiseForm = {
  name: string;
  description: string;
  price: number;
};

const fetcher = async (args: { key: string; id: string }) => {
  const response = await apiClient.v1.merchandises._merchandise(args.id).$get();
  return response;
};

export const MerchandiseEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, isLoading: isUserLoading } = useAuthUser();
  const { data, isLoading: isMerchandiseLoading } = useSWR(
    id ? { key: `/v1/merchandises/${id}`, id } : null,
    fetcher
  );

  const merchandise = data?.data;

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<MerchandiseForm>({
    defaultValues: { name: '', description: '', price: 0 },
  });

  // 取得した商品の値をフォームに反映する
  React.useEffect(() => {
    if (!merchandise) return;

    reset({
      name: merchandise.name,
      description: merchandise.description ?? '',
      price: Number(merchandise.price),
    });
  }, [merchandise, reset]);

  const isLoading = isUserLoading || isMerchandiseLoading;

  /** 本人が作成した商品のみ編集できる */
  const canEdit =
    !!user && !!merchandise?.author_id && String(user.id) === String(merchandise.author_id);

  const onSubmit = handleSubmit(async (values) => {
    if (!id) return;

    setErrorMessage(null);

    try {
      await apiClient.v1.merchandises._merchandise(id).$put({
        body: {
          name: values.name,
          description: values.description,
          price: Number(values.price),
        },
      });

      navigate('/merchandises');
    } catch (error) {
      setErrorMessage(toErrorMessage(error, '商品の更新に失敗しました'));
    }
  });

  if (isLoading) {
    return <p style={{ padding: 8 }}>読み込み中...</p>;
  }

  if (!merchandise) {
    return <p style={{ padding: 8 }}>商品が見つかりませんでした</p>;
  }

  // 未ログインの場合はログイン画面へ誘導する
  if (!user) {
    return (
      <div style={{ padding: 8 }}>
        <h1>商品編集</h1>
        <p>編集するにはログインが必要です</p>
        <Button href={`/login?redirect=/merchandises/${id}/edit`}>ログイン</Button>
      </div>
    );
  }

  if (!canEdit) {
    return (
      <div style={{ padding: 8 }}>
        <h1>商品編集</h1>
        <p>この商品を編集する権限がありません</p>
        <Button href="/merchandises">商品一覧へ戻る</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: 8 }}>
      <h1>商品編集</h1>

      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}
      >
        <TextField control={control} name="name" label="商品名" required maxLength={50} />

        <TextArea control={control} name="description" label="説明" rows={4} />

        <TextField
          control={control}
          name="price"
          label="価格（円）"
          type="number"
          required
          rules={{
            min: { value: 0, message: '価格は0以上で入力してください' },
          }}
        />

        {errorMessage && <p style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{errorMessage}</p>}

        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '保存中...' : '保存する'}
          </Button>
          <Button href="/merchandises">キャンセル</Button>
        </div>
      </form>
    </div>
  );
};
