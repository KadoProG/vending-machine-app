import { apiClient } from '@/lib/apiClient';
import { VendingMachine01 } from '@/pages/vending-machines/[id]/components/VendingMachine01';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

const fetcher = async (args: { key: string; id: string }) => {
  const response = await apiClient.v1.vending_machines._vendingMachine(args.id).$get();
  return response;
};

export const VendingMachinesDetailPage = () => {
  const { id } = useParams();

  const { data } = useSWR(id ? { key: `/vending-machines/${id}`, id } : null, fetcher, {});

  const vendingMachine = data?.data;

  return (
    <div>
      <h1>Vending Machine Detail</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          paddingRight: 8,
          paddingLeft: 8,
        }}
      >
        <div
          style={{
            border: '1px solid var(--divider)',
            padding: 8,
            borderRadius: 4,
          }}
        >
          <h2>{vendingMachine?.name}</h2>
          {vendingMachine?.author && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
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
          {vendingMachine && <VendingMachine01 vendingMachine={vendingMachine} />}
        </div>
      </div>
    </div>
  );
};
