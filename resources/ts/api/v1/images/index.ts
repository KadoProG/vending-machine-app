/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../@types';

export type Methods = DefineMethods<{
  /**
   * 画像はアップロードした本人に紐づく非公開画像として保存する。
   * 公開中の商品で使われるようになった時点で、他のユーザーからも
   * 閲覧できるようになる（ImagePolicy::view）。
   */
  post: {
    status: 200;

    /** `ImageResource` */
    resBody: {
      data: Types.ImageResource;
    };

    reqFormat: FormData;
    reqBody: Types.StoreImageRequest;
  };
}>;
