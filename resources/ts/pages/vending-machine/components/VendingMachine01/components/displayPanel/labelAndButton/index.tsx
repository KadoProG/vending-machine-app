export const LabelAndButton: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: 'calc(100% / 8)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/images/sample01_plastic_bottle.png"
          alt="商品名"
          style={{
            width: '100%',
          }}
        />
      </div>
      <span
        style={{
          fontSize: '1%',
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          background: 'blue',
          color: 'white',
          display: 'inline-block',
          margin: '0 auto',
          transform: 'translateX(-5%) scale(0.8)',
          width: '110%',
          textAlign: 'center',
        }}
      >
        つめたい
      </span>
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
