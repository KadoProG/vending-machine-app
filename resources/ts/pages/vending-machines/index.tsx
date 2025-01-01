import { apiClient } from '@/lib/apiClient';
import React from 'react';

export const VendingMachinesPage = () => {
  const getData = React.useCallback(async () => {
    const data = await apiClient.v1.vending_machines.get();
    console.log(data.body.data);
    console.log(data.body.meta);
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
