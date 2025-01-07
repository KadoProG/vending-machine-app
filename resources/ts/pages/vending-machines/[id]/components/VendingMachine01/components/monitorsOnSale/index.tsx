/**
 * 販売中・金額のモニター
 */
export const MonitorsOnSale: React.FC = () => {
  const money = '19,999';

  return (
    <div
      style={{
        position: 'absolute',
        top: '54%',
        right: '20%',
        background: '#111',
        width: '10%',
        height: '4%',
        borderRadius: '10%',
        boxShadow: 'inset 0 -1px 1px rgba(255, 255, 255, 0.4)',
        padding: '0.25%',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '10%',
          background: '#222',
          boxShadow: 'inset 0 0.5px 1px rgba(255, 255, 255, 0.4)',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            position: 'absolute',
            display: 'inline-block',
            fontSize: '10%',
            fontWeight: 'bold',
            top: 0,
            right: '4%',
            transformOrigin: 'right',
            transform: 'scale(0.6, 0.7)',
            color: '#23C63E',
          }}
        >
          販売中
        </p>
        <p
          style={{
            position: 'absolute',
            display: 'inline-block',
            fontSize: '10%',
            fontWeight: 'bold',
            top: '4%',
            right: '44%',
            transformOrigin: 'right',
            transform: 'scale(0.8, 0.9)',
            color: '#ff2222',
          }}
        >
          {money}
        </p>
        <p
          style={{
            position: 'absolute',
            display: 'inline-block',
            fontSize: '10%',
            fontWeight: 'bold',
            top: '15%',
            right: '37%',
            transformOrigin: 'right',
            transform: 'scale(0.3, 0.3)',
            color: '#aaa',
          }}
        >
          円
        </p>
        <div
          style={{
            position: 'absolute',
            display: 'inline-block',
            top: '48%',
            width: '97%',
            height: '1%',
            background: '#aaa',
          }}
        />
      </div>
    </div>
  );
};
