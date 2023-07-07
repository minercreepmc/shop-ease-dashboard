export interface Product {
  id?: string;
  name?: string;
  price?: {
    amount: number;
    currency: string;
  };
  categories?: string[];
  image?: string;
}
