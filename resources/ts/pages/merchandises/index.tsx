import { Button } from '@/components/button/Button';
import { Pagination } from '@/components/navigation/Pagination';
import { useAuthUser } from '@/hooks/useAuthUser';
import { apiClient } from '@/lib/apiClient';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

const fetcher = async ({ page, per_page }: { key: string; page?: number; per_page?: number }) => {
  const response = await apiClient.v1.merchandises.get({
    query: {
      page,
      per_page,
    },
  });
  return response;
};

export const MerchandisesPage = () => {
  const { user } = useAuthUser();

  const { control, watch } = useForm<{ page: number }>({
    defaultValues: {
      page: 1,
    },
  });

  const page = watch('page');

  const { data } = useSWR(
    {
      key: '/v1/merchandises',
      page,
      per_page: 10,
    },
    fetcher
  );

  const merchandises = data?.body.data;
  const meta = data?.body
    ? {
        current_page: Number(data.body.current_page),
        per_page: Number(data.body.per_page),
        total: Number(data.body.total),
        last_page: Number(data.body.last_page),
      }
    : null;

  return (
    <div>
      <h1>Merchandises</h1>
      <Pagination
        control={control}
        name="page"
        rules={{ required: true }}
        count={meta?.last_page ?? 0}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          paddingRight: 8,
          paddingLeft: 8,
        }}
      >
        {merchandises?.map((merchandise) => (
          <div
            key={merchandise.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              width: '100%',
              textAlign: 'left',
              border: '1px solid var(--divider)',
              padding: 8,
              minHeight: 96,
            }}
          >
            {merchandise.image?.url ? (
              <img
                src={merchandise.image.url}
                alt={merchandise.image.alt}
                style={{
                  width: 64,
                  height: 80,
                  objectFit: 'contain',
                  border: '1px solid #ccc',
                }}
              />
            ) : (
              <div
                style={{
                  width: 64,
                  height: 80,
                  border: '1px solid #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'gray',
                  fontSize: 12,
                }}
              >
                画像なし
              </div>
            )}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 24 }}>{merchandise.name}</h2>
              <p
                style={{
                  color: merchandise.description ? 'black' : 'gray',
                  fontSize: 16,
                }}
              >
                {merchandise.description || '説明はありません'}
              </p>
              <p style={{ fontSize: 16 }}>{Number(merchandise.price).toLocaleString()}円</p>
              {merchandise.author?.name && (
                <p style={{ fontSize: 14, color: 'gray' }}>{merchandise.author.name}</p>
              )}
            </div>
            {/* 本人が作成した商品のみ編集できる */}
            {!!user && user.id === merchandise.author_id && (
              <Button href={`/merchandises/${merchandise.id}/edit`}>編集</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
