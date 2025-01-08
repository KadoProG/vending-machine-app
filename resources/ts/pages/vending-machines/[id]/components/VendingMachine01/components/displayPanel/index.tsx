import { VendingMachineMerchandiseResource } from '@/api/@types';
import { LabelAndButton } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/displayPanel/labelAndButton';

type Props = {
  merchandises: VendingMachineMerchandiseResource[];
};

/**
 * 表示パネル
 */
export const DisplayPanel: React.FC<Props> = ({ merchandises }) => {
  const VENDING_MACHINE_ROW = 3 as const;
  const VENDING_MACHINE_COLUMN = 8 as const;

  return (
    <div
      style={{
        position: 'absolute',
        top: '1.5%',
        left: '2%',
        background: '#eee',
        width: '80%',
        height: '50%',
        borderRadius: '1%',
        padding: '1%',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {Array.from({ length: VENDING_MACHINE_ROW }).map((_, index) => (
          <div
            key={`display_panel_row_${index}`}
            style={{
              display: 'flex',
              height: `calc(100% / ${VENDING_MACHINE_ROW})`,
            }}
          >
            {Array.from({ length: VENDING_MACHINE_COLUMN }).map((_, index2) => (
              <LabelAndButton
                key={`display_panel_row_${index2}`}
                merchandise={merchandises[index * VENDING_MACHINE_COLUMN + index2]}
                vendingMachineColumnCount={VENDING_MACHINE_COLUMN}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
