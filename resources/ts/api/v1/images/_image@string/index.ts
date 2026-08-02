/* eslint-disable */
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  /** 非公開画像は Web ルート外に置かれているため、必ずこのエンドポイントを経由する。 */
  get: {
    status: 200;
  };
}>;
