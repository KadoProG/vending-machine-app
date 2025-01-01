import { apiClient } from '@/lib/apiClient';
import useSWR from 'swr';

export const VendingMachinesPage = () => {
  const { data } = useSWR('/v1/vending-machines', apiClient.v1.vending_machines.get, {});

  const vendingMachines = data?.body.data;

  return (
    <div>
      <h1>Vending Machines</h1>
      {vendingMachines?.map((vendingMachine) => (
        <div
          key={vendingMachine.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px',
          }}
        >
          <h2>{vendingMachine.name}</h2>
          <p
            style={{
              color: vendingMachine.description ? 'black' : 'gray',
            }}
          >
            {vendingMachine.description ?? '説明はありません'}
          </p>
          {vendingMachine.author && <p>icon {vendingMachine.author.name}</p>}
        </div>
      ))}
    </div>
  );
};
