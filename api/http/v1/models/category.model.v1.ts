export class V1CategoryModel {
  id: string;
  name: string;
  description?: string;
  product_ids?: string[];
  products?: {
    id: string;
    name: string;
    price: number;
    description?: string;
    image_url?: string;
  }[];
}
