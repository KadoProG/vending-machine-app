import { apiClient } from '@/lib/apiClient';
import useSWR from 'swr';

export const VendingMachinesPage = () => {
  const { data } = useSWR('/v1/vending-machines', apiClient.v1.vending_machines.get, {});

  const vendingMachines = data?.body.data;

  return (
    <div>
      <h1>Vending Machines</h1>
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
          <div
            key={vendingMachine.id}
            style={{
              border: '1px solid #ccc',
              padding: 8,
              paddingBottom: 48,
              minHeight: 120,
              position: 'relative',
              boxShadow: `inset 0 -4px 4px -2px ${vendingMachine.background?.css_type ?? 'white'}`,
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
          </div>
        ))}
      </div>
    </div>
  );
};
