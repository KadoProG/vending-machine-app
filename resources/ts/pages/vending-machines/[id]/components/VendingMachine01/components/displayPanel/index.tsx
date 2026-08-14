import { VendingMachineMerchandiseResource } from '@/api/@types';
import { LabelAndButton } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/displayPanel/labelAndButton';

type Props = {
  merchandises: VendingMachineMerchandiseResource[];
  /** 棚の列数（横方向の商品数） */
  columnCount: number;
  /** 棚の行数（縦方向の商品数） */
  rowCount: number;
};

/**
 * 表示パネル
 */
export const DisplayPanel: React.FC<Props> = ({ merchandises, columnCount, rowCount }) => {
  // 棚の位置から商品を引けるようにする
  const merchandiseByPosition = new Map<string, VendingMachineMerchandiseResource>(
    merchandises.map((merchandise) => [
      `${merchandise.shelf_row},${merchandise.shelf_column}`,
      merchandise,
    ])
  );

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
        {Array.from({ length: rowCount }).map((_, row) => (
          <div
            key={`display_panel_row_${row}`}
            style={{
              display: 'flex',
              height: `calc(100% / ${rowCount})`,
            }}
          >
            {Array.from({ length: columnCount }).map((_, column) => (
              <LabelAndButton
                key={`display_panel_row_${row}_column_${column}`}
                merchandise={merchandiseByPosition.get(`${row},${column}`)}
                vendingMachineColumnCount={columnCount}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
