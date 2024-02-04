export class OrderLine {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  is_reward: boolean;
  product_name: string;
  unit_price_after_discount?: number;
}
