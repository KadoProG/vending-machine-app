/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../../@types';

export type Methods = DefineMethods<{
  /** 非公開の自販機は作成した本人のみ閲覧できる。 */
  get: {
    status: 200;

    /** `VendingMachineResource` */
    resBody: {
      data: Types.VendingMachineResource;
    };
  };
}>;
