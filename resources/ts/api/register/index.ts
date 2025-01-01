/* eslint-disable */
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    status: 204;

    reqBody: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    };
  };
}>;
