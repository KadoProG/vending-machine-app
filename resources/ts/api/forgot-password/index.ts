/* eslint-disable */
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    status: 200;

    resBody: {
      status: string;
    };

    reqBody: {
      email: string;
    };
  };
}>;
