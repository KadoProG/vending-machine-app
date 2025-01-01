/* eslint-disable */
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    status: 200;

    resBody: {
      status: string;
    };

    reqBody: {
      token: string;
      email: string;
      password: string;
      password_confirmation: string;
    };
  };
}>;
