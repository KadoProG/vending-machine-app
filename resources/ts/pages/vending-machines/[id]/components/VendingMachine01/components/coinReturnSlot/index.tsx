import React from 'react';

/** コイン返却口 */
export const CoinReturnSlot: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div
      style={{
        position: 'absolute',
        top: '74%',
        right: '6%',
        background: '#333',
        width: '8%',
        height: '6%',
        borderRadius: '50% 50% 15% 15%',
        boxShadow: 'inset 0 -1px 1px rgba(255, 255, 255, 0.4)',
        padding: '2.5% 0.5% 1.5%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* 下の曲線 */}
      <button
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: '#666',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '10%',
          position: 'relative',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(true);
            setTimeout(() => {
              setIsOpen(false);
            }, 200);
          }
        }}
        onMouseDown={(e) => {
          setIsOpen(true);
          e.preventDefault();
        }}
        onMouseUp={() => setIsOpen(false)}
      >
        <div
          style={{
            position: 'absolute',
            top: '1%',
            left: '0.25%',
            background: 'rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            width: '99.5%',
            height: '98%',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10%',
            fontSize: 10,
            color: 'white',
            transition: '0.5s',
            transformOrigin: 'top',
            transform: isOpen ? 'scale(1,-0.2)' : undefined,
          }}
        />
      </button>
    </div>
  );
};
