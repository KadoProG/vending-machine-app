import React from 'react';

export const ReturnLever: React.FC = () => {
  const [isReturn, setIsReturn] = React.useState<boolean>(false);

  return (
    <>
      <button
        style={{
          position: 'absolute',
          top: '55%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          width: '40%',
          height: '63%',
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2), inset 0 1px 3px rgba(255, 255, 255, 0.3)',
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsReturn(true);
            setTimeout(() => {
              setIsReturn(false);
            }, 200);
          }
        }}
        onMouseDown={(e) => {
          setIsReturn(true);
          e.preventDefault();
        }}
        onMouseUp={() => setIsReturn(false)}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '35%',
              left: '5%',
              width: '30%',
              height: '30%',
              background: '#aaa',
              borderRadius: '50%',
              transformOrigin: 'center',
              transition: 'transform 0.2s',
              transform: isReturn ? 'rotate(30deg)' : 'rotate(0deg)',
              boxShadow: 'inset 0 0 2px rgba(255, 255, 255, 0.6)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                width: '120%',
                height: '50%',
                background: '#aaa',
                boxShadow: 'inset -1px 1px 2px rgba(255, 255, 255, 0.3)',
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                top: '4%',
                left: '150%',
                width: '120%',
                height: '50%',
                transformOrigin: 'left top',
                transform: 'rotate(-20deg)',
                background: '#aaa',
                clipPath: 'polygon(0% 0%, 100% 30%, 100% 60%, 0% 100%)',
                boxShadow: 'inset -1px 1px 2px rgba(255, 255, 255, 0.3)',
              }}
            ></div>
          </div>
        </div>
      </button>
      <div
        style={{
          position: 'absolute',
          top: '-2%',
          left: '0%',
          height: '63%',
          fontSize: '1.5%',
          color: 'white',
          transform: 'scale(0.6)',
          fontWeight: 'bold',
        }}
      >
        おつり・返却
      </div>
    </>
  );
};
