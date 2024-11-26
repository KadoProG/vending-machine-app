import React, { useState } from 'react';
import styles from '@/components/button/Button.module.scss';

export interface ButtonProps {
  href?: string;
  width?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = (props) => {
  const [rippleStyles, setRippleStyles] = useState<React.CSSProperties | null>(null);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    setRippleStyles({
      width: size,
      height: size,
      top: y,
      left: x,
    });

    if (props.onMouseDown) {
      props.onMouseDown(e);
    }
  };

  return (
    <div className={styles.container}>
      {props.href ? (
        <a
          href={props.href}
          className={styles.button}
          style={{ width: props.width, ...props.style }}
          onMouseDown={handleMouseDown}
          onClick={props.onClick}
          tabIndex={0} // フォーカスを持たせる
        >
          {props.children}
          {rippleStyles && (
            <span
              className={styles.ripple}
              style={rippleStyles}
              onAnimationEnd={() => setRippleStyles(null)}
            />
          )}
        </a>
      ) : (
        <button
          onMouseDown={handleMouseDown}
          onClick={props.onClick}
          disabled={props.disabled}
          type={props.type}
          className={styles.button}
          style={{ width: props.width, ...props.style }}
          tabIndex={0} // フォーカスを持たせる
        >
          {props.children}
          {rippleStyles && (
            <span
              className={styles.ripple}
              style={rippleStyles}
              onAnimationEnd={() => setRippleStyles(null)}
            />
          )}
        </button>
      )}
    </div>
  );
};
