import { VendingMachineMerchandiseResource } from '@/api/@types';
import React from 'react';

const temperatureStatuses = [
  {
    value: 'ice',
    label: 'つめた〜い',
    background: 'blue',
    color: 'white',
  },
  {
    value: 'default',
    label: 'じょうお〜ん',
    background: 'green',
    color: 'white',
  },
  {
    value: 'hot',
    label: 'あったか〜い',
    background: 'red',
    color: 'white',
  },
] as const;

type Props = {
  temperature_status: VendingMachineMerchandiseResource['temperature_status'];
};

/**
 * 温度ラベルの表示
 */
export const TemperatureLabel: React.FC<Props> = ({ temperature_status }) => {
  const temperatureStatus = temperatureStatuses.find((t) => t.value === temperature_status);
  return (
    <span
      style={{
        fontSize: '1%',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        background: temperatureStatus?.background,
        color: temperatureStatus?.color,
        display: 'inline-block',
        margin: '0 auto',
        transform: 'translateX(-5%) scale(0.8)',
        width: '110%',
        textAlign: 'center',
      }}
    >
      {temperatureStatus?.label}
    </span>
  );
};
