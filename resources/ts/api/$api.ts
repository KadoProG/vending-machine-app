import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_1kmeqgk } from './email/verification-notification';
import type { Methods as Methods_1r7pmad } from './forgot-password';
import type { Methods as Methods_idk8rz } from './login';
import type { Methods as Methods_1rpsris } from './logout';
import type { Methods as Methods_1pbnd9f } from './register';
import type { Methods as Methods_1i354bd } from './reset-password';
import type { Methods as Methods_1canki } from './v1/images/_image@string';
import type { Methods as Methods_rarsj8 } from './v1/merchandises';
import type { Methods as Methods_15slns2 } from './v1/merchandises/_merchandise@string';
import type { Methods as Methods_zyr5pb } from './v1/users/me';
import type { Methods as Methods_1sbzx06 } from './v1/vending-machines';
import type { Methods as Methods_o66vf } from './v1/vending-machines/_vendingMachine@string';
import type { Methods as Methods_15dy3xk } from './v1/vending-machines/_vendingMachine@string/merchandises';
import type { Methods as Methods_1x2du5x } from './verify-email/_id@string/_hash@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost/api' : baseURL).replace(/\/$/, '');
  const PATH0 = '/email/verification-notification';
  const PATH1 = '/forgot-password';
  const PATH2 = '/login';
  const PATH3 = '/logout';
  const PATH4 = '/register';
  const PATH5 = '/reset-password';
  const PATH6 = '/v1/images';
  const PATH7 = '/v1/merchandises';
  const PATH8 = '/v1/users/me';
  const PATH9 = '/v1/vending-machines';
  const PATH10 = '/merchandises';
  const PATH11 = '/verify-email';
  const GET = 'GET';
  const POST = 'POST';
  const PUT = 'PUT';

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
      images: {
        _image: (val2: string) => {
          const prefix2 = `${PATH6}/${val2}`;

          return {
            /**
             * 非公開画像は Web ルート外に置かれているため、必ずこのエンドポイントを経由する。
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_1canki['get']['status']>(prefix, prefix2, GET, option).send(),
            /**
             * 非公開画像は Web ルート外に置かれているため、必ずこのエンドポイントを経由する。
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<void, BasicHeaders, Methods_1canki['get']['status']>(prefix, prefix2, GET, option).send().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
      },
      merchandises: {
        _merchandise: (val2: string) => {
          const prefix2 = `${PATH7}/${val2}`;

          return {
            /**
             * @returns `MerchandiseResource`
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_15slns2['get']['resBody'], BasicHeaders, Methods_15slns2['get']['status']>(prefix, prefix2, GET, option).json(),
            /**
             * @returns `MerchandiseResource`
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_15slns2['get']['resBody'], BasicHeaders, Methods_15slns2['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
            /**
             * 商品を作成した本人のみ更新できる。
             * @returns `MerchandiseResource`
             */
            put: (option: { body: Methods_15slns2['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_15slns2['put']['resBody'], BasicHeaders, Methods_15slns2['put']['status']>(prefix, prefix2, PUT, option).json(),
            /**
             * 商品を作成した本人のみ更新できる。
             * @returns `MerchandiseResource`
             */
            $put: (option: { body: Methods_15slns2['put']['reqBody'], config?: T | undefined }) =>
              fetch<Methods_15slns2['put']['resBody'], BasicHeaders, Methods_15slns2['put']['status']>(prefix, prefix2, PUT, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        /**
         * @returns `MerchandiseCollection`
         */
        get: (option?: { query?: Methods_rarsj8['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_rarsj8['get']['resBody'], BasicHeaders, Methods_rarsj8['get']['status']>(prefix, PATH7, GET, option).json(),
        /**
         * @returns `MerchandiseCollection`
         */
        $get: (option?: { query?: Methods_rarsj8['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_rarsj8['get']['resBody'], BasicHeaders, Methods_rarsj8['get']['status']>(prefix, PATH7, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_rarsj8['get']['query'] } | undefined) =>
          `${prefix}${PATH7}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      users: {
        me: {
          /**
           * @returns `UserResource`
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_zyr5pb['get']['resBody'], BasicHeaders, Methods_zyr5pb['get']['status']>(prefix, PATH8, GET, option).json(),
          /**
           * @returns `UserResource`
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_zyr5pb['get']['resBody'], BasicHeaders, Methods_zyr5pb['get']['status']>(prefix, PATH8, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${PATH8}`,
        },
      },
      vending_machines: {
        _vendingMachine: (val2: string) => {
          const prefix2 = `${PATH9}/${val2}`;

          return {
            merchandises: {
              /**
               * @returns Array of `VendingMachineMerchandiseResource`
               */
              get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_15dy3xk['get']['resBody'], BasicHeaders, Methods_15dy3xk['get']['status']>(prefix, `${prefix2}${PATH10}`, GET, option).json(),
              /**
               * @returns Array of `VendingMachineMerchandiseResource`
               */
              $get: (option?: { config?: T | undefined } | undefined) =>
                fetch<Methods_15dy3xk['get']['resBody'], BasicHeaders, Methods_15dy3xk['get']['status']>(prefix, `${prefix2}${PATH10}`, GET, option).json().then(r => r.body),
              $path: () => `${prefix}${prefix2}${PATH10}`,
            },
            /**
             * @returns `VendingMachineResource`
             */
            get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_o66vf['get']['resBody'], BasicHeaders, Methods_o66vf['get']['status']>(prefix, prefix2, GET, option).json(),
            /**
             * @returns `VendingMachineResource`
             */
            $get: (option?: { config?: T | undefined } | undefined) =>
              fetch<Methods_o66vf['get']['resBody'], BasicHeaders, Methods_o66vf['get']['status']>(prefix, prefix2, GET, option).json().then(r => r.body),
            $path: () => `${prefix}${prefix2}`,
          };
        },
        /**
         * @returns `VendingMachineCollection`
         */
        get: (option?: { query?: Methods_1sbzx06['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1sbzx06['get']['resBody'], BasicHeaders, Methods_1sbzx06['get']['status']>(prefix, PATH9, GET, option).json(),
        /**
         * @returns `VendingMachineCollection`
         */
        $get: (option?: { query?: Methods_1sbzx06['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_1sbzx06['get']['resBody'], BasicHeaders, Methods_1sbzx06['get']['status']>(prefix, PATH9, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_1sbzx06['get']['query'] } | undefined) =>
          `${prefix}${PATH9}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
    },
    verify_email: {
      _id: (val1: string) => {
        const prefix1 = `${PATH11}/${val1}`;

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
