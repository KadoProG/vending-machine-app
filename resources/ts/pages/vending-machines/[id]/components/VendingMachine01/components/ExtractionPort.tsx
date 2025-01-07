import React from 'react';

/** 取り出し口 */
export const ExtractionPort: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <button
      style={{
        display: 'block',
        position: 'absolute',
        top: '70%',
        left: '10%',
        background: '#999',
        width: '60%',
        height: '10%',
        borderRadius: '2%',
        cursor: 'pointer',
        border: 'none',
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      ここは取り出し口
      <div
        style={{
          position: 'absolute',
          top: '1%',
          left: '0.25%',
          background: 'rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          borderRadius: '2%',
          width: '99.5%',
          height: '98%',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          color: 'white',
          transition: '0.5s',
          transformOrigin: 'top',
          transform: isOpen ? 'scale(1,-0.2)' : undefined,
        }}
      >
        <p>これは取り出し口のフタ</p>
      </div>
    </button>
  );
};
