import { VendingMachineMerchandiseResource } from '@/api/@types';
import { TemperatureLabel } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/displayPanel/labelAndButton/components/TemperatureLabel';

type Props = {
  merchandise?: VendingMachineMerchandiseResource;
  vendingMachineColumnCount: number;
};

export const LabelAndButton: React.FC<Props> = ({ merchandise, vendingMachineColumnCount }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: `calc(100% / ${vendingMachineColumnCount})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* ラベル画像の表示 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {merchandise && (
          <img
            // TODO 画像のパスを変更する
            src="/images/sample01_plastic_bottle.png"
            alt={merchandise?.name}
            style={{
              width: '100%',
            }}
          />
        )}
      </div>

      {merchandise && <TemperatureLabel temperature_status={merchandise.temperature_status} />}

      {/* ボタンの表示 */}
      <div
        style={{
          width: '100%',
          height: '20%',
          background: 'white',
          padding: '6% 12%',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <button
            style={{
              width: '100%',
              height: '100%',
              background: '#111',
              borderRadius: '50%',
              position: 'relative',
              border: 'none',
              boxShadow: 'inset 0 0 2px #fff',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: '13%',
                left: '6%',
                width: '55%',
                height: '74%',
                borderRadius: '50%',
                background: '#eaeac2',
                boxShadow: 'inset 0 0 2px #fff',
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
