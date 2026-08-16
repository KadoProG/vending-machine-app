import { Button } from '@/components/button/Button';
import styles from '@/components/input/ImageField.module.scss';
import { apiClient } from '@/lib/apiClient';
import { toErrorMessage } from '@/lib/apiError';
import React from 'react';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

export type ImageFieldProps<T extends FieldValues> = UseControllerProps<T> & {
  /** ラベル */
  label?: string;
  /** フォーム上の名前。画像 ID を保持する */
  name: string;
  /** 初期表示する画像の URL */
  defaultImageUrl?: string;
  /** 初期表示する画像の代替テキスト */
  defaultImageAlt?: string;
};

/**
 * 画像を選択してアップロードするフィールド。
 *
 * 選択と同時にアップロードし、フォームには発行された画像 ID を保持する。
 * アップロードした画像は非公開だが、公開中の商品で使われるようになった
 * 時点で他のユーザーからも閲覧できるようになる。
 */
export const ImageField = <T extends FieldValues>(props: ImageFieldProps<T>) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { field, fieldState } = useController<T>({
    name: props.name,
    control: props.control,
    rules: props.rules,
  });

  const [uploadedUrl, setUploadedUrl] = React.useState<string | null>(null);
  const [isRemoved, setIsRemoved] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  // 取得済みの画像は非同期で届くため、state の初期値ではなく都度参照する
  const previewUrl = uploadedUrl ?? (isRemoved ? undefined : props.defaultImageUrl);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // 同じファイルを選び直せるよう、値は毎回クリアする
    e.target.value = '';

    if (!file) return;

    setErrorMessage(null);
    setIsUploading(true);

    try {
      const response = await apiClient.v1.images.$post({ body: { file } });

      field.onChange(response.data.id);
      setUploadedUrl(response.data.url);
      setIsRemoved(false);
    } catch (error) {
      setErrorMessage(toErrorMessage(error, '画像のアップロードに失敗しました'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    field.onChange('');
    setUploadedUrl(null);
    setIsRemoved(true);
    setErrorMessage(null);
  };

  return (
    <div className={styles.container}>
      {props.label && <span className={styles.label}>{props.label}</span>}

      <div className={styles.body}>
        {previewUrl ? (
          <img src={previewUrl} alt={props.defaultImageAlt ?? ''} className={styles.preview} />
        ) : (
          <div className={styles.empty}>画像なし</div>
        )}

        <div className={styles.actions}>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className={styles.file_input}
            onChange={handleChange}
          />

          <Button type="button" onClick={() => inputRef.current?.click()} disabled={isUploading}>
            {isUploading ? 'アップロード中...' : '画像を選択'}
          </Button>

          {previewUrl && (
            <Button type="button" onClick={handleRemove} disabled={isUploading}>
              画像を外す
            </Button>
          )}

          <span className={styles.hint}>jpg / png / webp・5MBまで</span>
        </div>
      </div>

      {(errorMessage || fieldState.error) && (
        <p className={styles.error}>{errorMessage ?? fieldState.error?.message}</p>
      )}
    </div>
  );
};
