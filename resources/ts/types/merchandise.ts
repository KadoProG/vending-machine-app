enum TemperatureStatus {
  COLD = 'cold',
  HOT = 'hot',
}

export type Merchandise = {
  /** 商品ID */
  id: number;
  /** 商品名 */
  name: string;
  /** 商品価格 */
  price: number;
  /** 在庫数 */
  stock: number;
  /** 商品画像 */
  image: string;
  /** 商品の温度ステータス */
  temperatureStatus: TemperatureStatus;
};
