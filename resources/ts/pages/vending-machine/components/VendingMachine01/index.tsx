import { CoinSlot } from '@/pages/vending-machine/components/VendingMachine01/components/coinSlot';
import { DisplayPanel } from '@/pages/vending-machine/components/VendingMachine01/components/displayPanel';
import { ExtractionPort } from '@/pages/vending-machine/components/VendingMachine01/components/ExtractionPort';
import { MonitorsOnSale } from '@/pages/vending-machine/components/VendingMachine01/components/monitorsOnSale';

export const VendingMachine01 = () => (
  <div
    style={{
      position: 'relative',
      background: 'blue',
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
    <MonitorsOnSale />
  </div>
);
