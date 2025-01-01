import { apiClient } from '@/lib/apiClient';
import React from 'react';

export const VendingMachinesPage = () => {
  const getData = React.useCallback(async () => {
    const data = await apiClient.v1.vending_machines.get();
    console.log(JSON.parse(data.body));
  }, []);

  React.useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <h1>Vending Machines</h1>
    </div>
  );
};
