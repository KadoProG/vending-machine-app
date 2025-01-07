import React from 'react';

/** お札入れるところ */
export const BillSlot: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div
      style={{
        position: 'absolute',
        top: '60%',
        right: '21%',
        background: '#333',
        width: '8%',
        height: '4%',
        borderRadius: '10%',
        boxShadow: 'inset 0 -1px 1px rgba(255, 255, 255, 0.4)',
        padding: '1% 0.25% 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <button
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          height: '80%',
          background: '#ccc',
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
            fontSize: 10,
            fontWeight: 'bold',
            transform: 'scale(0.6)',
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              display: 'inline-block',
              whiteSpace: 'nowrap',
              background: '#333',
              color: 'white',
            }}
          >
            1000円札
            <br />
          </span>
          <span>▼</span>
        </div>
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
