import { V1CategoryModel, V1DiscountModel } from './models';
import { PopulateDetails } from './query';

export class V1GetProductHttpQuery implements PopulateDetails {
  populate_details?: boolean;
}
export class V1GetProductHttpResponse {
  discount?: V1DiscountModel;
  categories?: V1CategoryModel[];
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  discount_id?: string;
  category_ids?: string[];
  id: string;
}
