export interface Product {
  id: string;
  name: string;
  stock: number;
  price: {
    amount: number;
    currency: string;
  };
  categories: string[];
  image: string;
}
