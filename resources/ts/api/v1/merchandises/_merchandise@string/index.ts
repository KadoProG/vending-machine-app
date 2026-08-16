/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../@types';

export type Methods = DefineMethods<{
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
