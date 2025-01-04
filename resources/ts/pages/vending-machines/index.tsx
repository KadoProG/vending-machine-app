import { Button } from '@/components/button/Button';
import { Pagination } from '@/components/navigation/Pagination';
import { apiClient } from '@/lib/apiClient';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

const fetcher = async ({ page, per_page }: { page?: number; per_page?: number }) => {
  const response = await apiClient.v1.vending_machines.get({
    query: {
      page,
      per_page,
    },
  });
  return response;
};

export const VendingMachinesPage = () => {
  const { control, watch } = useForm<{ page: number }>({
    defaultValues: {
      page: 1,
    },
  });

  const page = watch('page');

  const { data } = useSWR(
    {
      page,
      per_page: 10,
    },
    fetcher,
    {}
  );

  const vendingMachines = data?.body.data;
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
      <h1>Vending Machines</h1>
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
        {vendingMachines?.map((vendingMachine) => (
          <Button
            key={vendingMachine.id}
            style={{
              display: 'block',
              width: '100%',
              background: 'transparent',
              textAlign: 'left',
              border: '1px solid var(--divider)',
              padding: 8,
              paddingBottom: 48,
              minHeight: 120,
              position: 'relative',
              boxShadow: `inset 0 -4px 4px -2px ${vendingMachine.background?.css_type ?? 'white'}`,
            }}
            href={`/vending-machines/${vendingMachine.id}`}
          >
            <h2 style={{ fontSize: 24 }}>{vendingMachine.name}</h2>
            <p
              style={{
                color: vendingMachine.description ? 'black' : 'gray',
                fontSize: 16,
              }}
            >
              {vendingMachine.description ?? '説明はありません'}
            </p>
            {vendingMachine.author && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  padding: 8,
                }}
              >
                <img
                  src={vendingMachine.author.image.image_url}
                  alt={vendingMachine.author.image.alt}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '1px solid #ccc',
                  }}
                />
                {vendingMachine.author.name}
              </div>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};
