import { LabelAndButton } from '@/pages/vending-machines/[id]/components/VendingMachine01/components/displayPanel/labelAndButton';

/**
 * 表示パネル
 */
export const DisplayPanel: React.FC = () => {
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
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: 'calc(100% / 3)',
          }}
        >
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
        </div>
        <div
          style={{
            display: 'flex',
            height: 'calc(100% / 3)',
          }}
        >
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
        </div>
        <div
          style={{
            display: 'flex',
            height: 'calc(100% / 3)',
          }}
        >
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
          <LabelAndButton />
        </div>
      </div>
    </div>
  );
};
