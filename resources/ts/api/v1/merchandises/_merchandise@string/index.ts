/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../@types';

export type Methods = DefineMethods<{
  /** 非公開の商品は作成した本人のみ閲覧できる。 */
  get: {
    status: 200;

    /** `MerchandiseResource` */
    resBody: {
      data: Types.MerchandiseResource;
    };
  };

  /** 商品を作成した本人のみ更新できる。 */
  put: {
    status: 200;

    /** `MerchandiseResource` */
    resBody: {
      data: Types.MerchandiseResource;
    };

    reqBody: Types.UpdateMerchandiseRequest;
  };
}>;
