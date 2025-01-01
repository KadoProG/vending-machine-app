/* eslint-disable */
import type { DefineMethods } from 'aspida';
import type * as Types from '../../@types';

export type Methods = DefineMethods<{
  get: {
    status: 200;

    /** `VendingMachineCollection` */
    resBody: Types.VendingMachineCollection & {
      meta: {
        current_page: string;
        per_page: string;
        total: string;
        last_page: string;
      };
    };
  };
}>;
