import { VendingMachineResource } from '@/api/@types';
import { BillSlot } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/billSlot';
import { CoinReturnSlot } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/coinReturnSlot';
import { CoinSlot } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/coinSlot';
import { DisplayPanel } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/displayPanel';
import { ExtractionPort } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/ExtractionPort';
import { MonitorsOnSale } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/monitorsOnSale';

type Props = {
  vendingMachine: VendingMachineResource;
};

export const VendingMachine01: React.FC<Props> = ({ vendingMachine }) => (
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
    <DisplayPanel />
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
