import styles from '@/components/input/TextField.module.scss';
import React from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

export type TextFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  /** ラベル */
  label?: string;
  /** フォーム上の名前 */
  name: string;
  /** プレースホルダー */
  placeholder?: string;
  /** 必須項目にするか */
  required?: boolean;
  /** デザインの追記 */
  style?: React.CSSProperties;
  /** inputのtype */
  type?: React.HTMLInputTypeAttribute;
  /** ロード時フォームフォーカス */
  autoFocus?: boolean;
  /** 入力の補完 */
  autoComplete?: string;
  /** フィールドフォーカス解除時の動作 */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** フィールドが有効か否か */
  isActiveFocus?: boolean;
  /** 入力可能な最大文字数 */
  maxLength?: number;
};

export const TextField = <T extends FieldValues>(props: TextFieldProps<T>) => {
  const ref = React.useRef<HTMLInputElement>(null);

  const { field, fieldState } = useController<T>({
    name: props.name,
    control: props.control,
    rules: {
      ...props.rules,
      required: props.required ? '入力必須の項目です' : undefined,
      maxLength: props.maxLength
        ? {
            value: props.maxLength,
            message: `${props.maxLength}文字以内で入力してください`,
          }
        : undefined,
    },
  });

  React.useEffect(() => {
    if (props.isActiveFocus) {
      ref.current?.focus();
    }
  }, [props.isActiveFocus]);

  return (
    <div className={styles.container} style={props.style}>
      {props.label && (
        <div>
          <label htmlFor={props.name} className={styles.label}>
            {props.label}
            {props.required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        </div>
      )}
      <input
        id={props.name}
        {...field}
        ref={ref}
        placeholder={props.placeholder}
        disabled={props.disabled}
        type={props.type}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        maxLength={props.maxLength}
        className={`${styles.input} ${fieldState.error ? styles.input_error : ''}`}
        onBlur={(e) => {
          field.onBlur();
          props.onBlur?.(e);
        }}
      />
      {fieldState.error && <p className={styles.error}>{fieldState.error.message}</p>}
    </div>
  );
};
