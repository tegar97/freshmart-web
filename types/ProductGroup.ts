
export interface ProductGroup {
  id: number;
  title: string;
  products: Product[];
  description: string;
}
export interface Product {
  id: number;
  categories_id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  weight: number;
  product_type: string;
  product_exp: string;
  product_calori: string;
  created_at: string;
  updated_at: string;
  discount_id: number;
  discount_percentage: number;
  now_price: number;
  
}