/* eslint-disable */
import type { ReadStream } from 'fs'

export type Image = {
  id: string;
  name: string;
  disk: string;
  path: string;
  original_name: string;
  mime_type: string;
  size: number;
  public_type: string;
  url: string;
}

export type ImageResource = {
  id: string;
  name: string;
  alt: string;
  description: string;
  mime_type: string;
  size: number;
  width: number;
  height: number;
  public_type: string;
  url: string;
}

export type LoginRequest = {
  email: string;
  password: string;
}

export type MerchandiseCollection = {
  data: MerchandiseResource[];
  current_page: string;
  per_page: string;
  total: string;
  last_page: string;
}

export type MerchandiseResource = {
  id: string;
  name: string;
  description: string;
  price: string;
  is_published: boolean;
  image_id: string;

  image: {
    id: string;
    alt: string;
    url: string;
  };

  author_id: string;

  author: {
    id: string;
    name: string;
  };
}

export type StoreImageRequest = {
  /** アップロードする画像ファイル */
  file: (File | ReadStream);
  /** 画像のタイトル。省略した場合はファイル名から補完する */
  name?: string | undefined;
  /** 代替テキスト */
  alt?: string | undefined;
  /** 画像の詳細説明 */
  description?: string | undefined;
}

export type UpdateMerchandiseRequest = {
  /** 商品名 */
  name: string;
  /** 商品の説明 */
  description?: string | undefined;
  /** 商品の価格 */
  price: number;
  /** 商品の画像ID */
  image_id?: string | undefined;
}

export type UserResource = {
  id: string;
  name: string;
  email: string;
  image: Image;
}

export type VendingMachineCollection = {
  data: VendingMachineResource[];
  current_page: string;
  per_page: string;
  total: string;
  last_page: string;
}

export type VendingMachineMerchandiseResource = {
  id: string;
  name: string;
  description: string;
  price: string;
  image_id: string;

  image: {
    id: string;
    alt: string;
    url: string;
  };

  author_id: string;

  author: {
    id: string;
    name: string;
  };

  shelf_column: number;
  shelf_row: number;
  stock_quantity: string;
  temperature_status: string;
}

export type VendingMachineResource = {
  id: string;
  name: string;
  description: string;
  column_count: number;
  row_count: number;
  is_published: boolean;

  background: {
    id: string;
    css_type: string;
  };

  author: {
    id: string;
    name: string;
    email: string;

    image: {
      id: string;
      alt: string;
      url: string;
    };
  };
}

export type ModelNotFoundException = {
  /** Error overview. */
  message: string;
}

export type AuthenticationException = {
  /** Error overview. */
  message: string;
}

export type ValidationException = {
  /** Errors overview. */
  message: string;

  /** A detailed description of each field that failed validation. */
  errors: {
    [key: string]: string[];
  };
}

export type AuthorizationException = {
  /** Error overview. */
  message: string;
}
