import styles from '@/components/input/TextField.module.scss';
import React from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

export type TextAreaProps<T extends FieldValues> = UseControllerProps<T> & {
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
  /** 表示行数 */
  rows?: number;
  /** 入力可能な最大文字数 */
  maxLength?: number;
};

/**
 * 複数行入力用のフィールド。
 *
 * デザインは TextField と共通のスタイルを利用する。
 */
export const TextArea = <T extends FieldValues>(props: TextAreaProps<T>) => {
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
      <textarea
        id={props.name}
        {...field}
        placeholder={props.placeholder}
        disabled={props.disabled}
        rows={props.rows}
        maxLength={props.maxLength}
        className={`${styles.input} ${fieldState.error ? styles.input_error : ''}`}
      />
      {fieldState.error && <p className={styles.error}>{fieldState.error.message}</p>}
    </div>
  );
};
