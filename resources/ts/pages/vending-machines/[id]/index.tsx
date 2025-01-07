import { apiClient } from '@/lib/apiClient';
import { VendingMachine01 } from '@/pages/vending-machines/[id]/components/VendingMachine01';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';

const fetcher = async (args: { key: string; id: string }) => {
  const response = await apiClient.v1.vending_machines._vendingMachine(args.id).$get();
  return response;
};

const fetcher2 = async (args: { key: string; id: string }) => {
  const response = await apiClient.v1.vending_machines._vendingMachine(args.id).merchandises.$get();
  return response;
};

export const VendingMachinesDetailPage = () => {
  const { id } = useParams();

  const { data } = useSWR(id ? { key: `/vending-machines/${id}`, id } : null, fetcher, {});

  const vendingMachine = data?.data;

  const { data: merchandises } = useSWR(
    vendingMachine?.id ? { key: `/vending-machines/${id}/merchandises`, id } : null,
    fetcher2
  );

  console.log(merchandises?.data);

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
          {vendingMachine && <VendingMachine01 vendingMachine={vendingMachine} />}
        </div>
      </div>
    </div>
  );
};
