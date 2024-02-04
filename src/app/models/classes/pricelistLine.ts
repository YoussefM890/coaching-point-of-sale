export class PricelistLine {
  id: number;
  pricelist_id: number;
  product_id: number;
  pricelist_name?: string;
  product_name?: string;
  price: number;
  min_quantity: number;
  start_date: Date;
  end_date: Date;
}
