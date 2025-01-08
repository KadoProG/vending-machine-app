import { VendingMachineResource } from '@/api/@types';
import { apiClient } from '@/lib/apiClient';
import { BillSlot } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/billSlot';
import { CoinReturnSlot } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/coinReturnSlot';
import { CoinSlot } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/coinSlot';
import { DisplayPanel } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/displayPanel';
import { ExtractionPort } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/ExtractionPort';
import { MonitorsOnSale } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/monitorsOnSale';
import useSWR from 'swr';

type Props = {
  vendingMachine: VendingMachineResource;
};

const fetcher = async (args: { key: string; id: string }) => {
  const response = await apiClient.v1.vending_machines._vendingMachine(args.id).merchandises.$get();
  return response;
};

export const VendingMachine01: React.FC<Props> = ({ vendingMachine }) => {
  const { data: merchandisesData } = useSWR(
    vendingMachine?.id
      ? { key: `/vending-machines/${vendingMachine.id}/merchandises`, id: vendingMachine.id }
      : null,
    fetcher
  );

  const merchandises = merchandisesData?.data || [];

  return (
    <div
      style={{
        position: 'relative',
        background: vendingMachine.background.css_type,
        width: 600,
        height: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DisplayPanel merchandises={merchandises} />
      <div
        style={{
          position: 'absolute',
          top: '53%',
          left: '2%',
          background: 'white',
          width: '35%',
          height: '14%',
          borderRadius: '1%',
        }}
      >
        ここは広告スペース
      </div>
      <ExtractionPort />
      <CoinSlot />
      <BillSlot />
      <MonitorsOnSale />
      <CoinReturnSlot />
    </div>
  );
};
