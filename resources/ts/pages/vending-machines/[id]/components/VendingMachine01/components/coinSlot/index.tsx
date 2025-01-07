import { ReturnLever } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/coinSlot/ReturnLever';

export const CoinSlot = () => (
  <div
    style={{
      position: 'absolute',
      top: '53%',
      right: '2%',
      background: '#555',
      width: '17%',
      height: '8%',
      borderRadius: '1%',
      boxShadow: 'inset 0 0px 4px rgba(255, 255, 255, 0.2)',
    }}
  >
    {/* コイン投入口 */}
    <div
      style={{
        position: 'absolute',
        top: '35%',
        right: '11%',
        transform: 'translate(-50%, -50%)',
        width: '18%',
        height: '29%',
        background: 'linear-gradient(#999, #777)',
        borderRadius: '50%',
        boxShadow: 'inset 0 -0.5px 0.5px rgba(255, 255, 255, 0.6)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '12%',
          background: '#222',
          boxShadow:
            'inset 0 -2px 3px rgba(255, 255, 255, 0.1), inset 0 2px 3px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '0%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70%',
              height: '50%',
              background: '#222',
              borderRadius: '50%',
            }}
          ></div>
        </div>
      </div>
    </div>
    {/* コイン投入口、白枠 */}
    <div
      style={{
        position: 'absolute',
        top: '35%',
        right: '6%',
        transform: 'translate(-50%, -50%)',
        width: '23%',
        height: '36%',
        border: '1px solid white',
        background: 'transparent',
        borderRadius: '50%',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(255, 255, 255, 0.3)',
      }}
    ></div>
    <div
      style={{
        position: 'absolute',
        top: '4%',
        right: '2%',
        width: '60%',
        transform: 'scale(0.3)',
      }}
    >
      <Coin index={0}>500</Coin>
      <Coin index={1}>100</Coin>
      <Coin index={2}>50</Coin>
      <Coin index={3}>10</Coin>
    </div>

    {/* おつり・返却レバー */}
    <ReturnLever />
  </div>
);

const Coin = (props: { children: React.ReactNode; index: number }) => (
  <span
    style={{
      color: 'white',
      fontSize: '1%',
      border: '1px solid white',
      minWidth: '35%',
      lineHeight: '200%',
      borderRadius: '50%',
      display: 'inline-block',
      textAlign: 'center',
      position: 'absolute',
      background: '#555',
      zIndex: 5 - props.index,
      left: `${props.index * 30}%`,
    }}
  >
    {props.children}
  </span>
);
