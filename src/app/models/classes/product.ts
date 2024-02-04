export class Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image_path?: string;
  category_id: number;
  category?: string;
  image?: string | ArrayBuffer;
  is_reward?: boolean;
  price_after_discount?: number;
}
