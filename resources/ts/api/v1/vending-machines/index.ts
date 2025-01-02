/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../@types';

export type Methods = DefineMethods<{
  get: {
    query?: {
      page?: number | undefined;
      per_page?: number | undefined;
    } | undefined;

    status: 200;
    /** `VendingMachineCollection` */
    resBody: Types.VendingMachineCollection;
  };
}>;
