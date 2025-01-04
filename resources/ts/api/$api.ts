import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1kmeqgk } from './email/verification-notification';
import type { Methods as Methods_1r7pmad } from './forgot-password';
import type { Methods as Methods_idk8rz } from './login';
import type { Methods as Methods_1rpsris } from './logout';
import type { Methods as Methods_1pbnd9f } from './register';
import type { Methods as Methods_1i354bd } from './reset-password';
import type { Methods as Methods_1sbzx06 } from './v1/vending-machines';
import type { Methods as Methods_1gaiora } from './v1/vending-machines/_id@string';
import type { Methods as Methods_1x2du5x } from './verify-email/_id@string/_hash@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost/api' : baseURL).replace(/\/$/, '');
  const PATH0 = '/email/verification-notification';
  const PATH1 = '/forgot-password';
  const PATH2 = '/login';
  const PATH3 = '/logout';
  const PATH4 = '/register';
  const PATH5 = '/reset-password';
  const PATH6 = '/v1/vending-machines';
  const PATH7 = '/verify-email';
  const GET = 'GET';
  const POST = 'POST';

  return {
    email: {
      verification_notification: {
        post: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods_1kmeqgk['post']['status']>(prefix, PATH0, POST, option).send(),
        $post: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods_1kmeqgk['post']['status']>(prefix, PATH0, POST, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
    },
    forgot_password: {
      post: (option: { body: Methods_1r7pmad['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1r7pmad['post']['resBody'], BasicHeaders, Methods_1r7pmad['post']['status']>(prefix, PATH1, POST, option).json(),
      $post: (option: { body: Methods_1r7pmad['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1r7pmad['post']['resBody'], BasicHeaders, Methods_1r7pmad['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    login: {
      post: (option: { body: Methods_idk8rz['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_idk8rz['post']['status']>(prefix, PATH2, POST, option).send(),
      $post: (option: { body: Methods_idk8rz['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_idk8rz['post']['status']>(prefix, PATH2, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
    logout: {
      post: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1rpsris['post']['status']>(prefix, PATH3, POST, option).send(),
      $post: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_1rpsris['post']['status']>(prefix, PATH3, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH3}`,
    },
    register: {
      post: (option: { body: Methods_1pbnd9f['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1pbnd9f['post']['status']>(prefix, PATH4, POST, option).send(),
      $post: (option: { body: Methods_1pbnd9f['post']['reqBody'], config?: T | undefined }) =>
        fetch<void, BasicHeaders, Methods_1pbnd9f['post']['status']>(prefix, PATH4, POST, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH4}`,
    },
    reset_password: {
      post: (option: { body: Methods_1i354bd['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1i354bd['post']['resBody'], BasicHeaders, Methods_1i354bd['post']['status']>(prefix, PATH5, POST, option).json(),
      $post: (option: { body: Methods_1i354bd['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1i354bd['post']['resBody'], BasicHeaders, Methods_1i354bd['post']['status']>(prefix, PATH5, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH5}`,
    },
    v1: {
      vending_machines: {
        _id: (val2: string) => {
          const prefix2 = `${PATH6}/${val2}`;

          return {
            /**
             * @returns `VendingMachineResource`
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1gaiora['get']['resBody'], BasicHeaders, Methods_1gaiora['get']['status']>(prefix, prefix2, GET, option).json(),
            /**
             * @returns `VendingMachineResource`
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_1gaiora['get']['resBody'], BasicHeaders, Methods_1gaiora['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        /**
         * @returns `VendingMachineCollection`
         */
        get: (option?: { query?: Methods_1sbzx06['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1sbzx06['get']['resBody'], BasicHeaders, Methods_1sbzx06['get']['status']>(prefix, PATH6, GET, option).json(),
        /**
         * @returns `VendingMachineCollection`
         */
        $get: (option?: { query?: Methods_1sbzx06['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1sbzx06['get']['resBody'], BasicHeaders, Methods_1sbzx06['get']['status']>(prefix, PATH6, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1sbzx06['get']['query'] } | undefined) =>
          `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
    },
    verify_email: {
      _id: (val1: string) => {
        const prefix1 = `${PATH7}/${val1}`;

        return {
          _hash: (val2: string) => {
            const prefix2 = `${prefix1}/${val2}`;

            return {
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods_1x2du5x['get']['status']>(prefix, prefix2, GET, option).send(),
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<void, BasicHeaders, Methods_1x2du5x['get']['status']>(prefix, prefix2, GET, option).send().then(r => r.body),
              $path: () => `${prefix}${prefix2}`,
            };
          },
        };
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
