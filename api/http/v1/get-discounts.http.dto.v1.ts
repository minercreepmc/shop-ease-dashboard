import { V1DiscountModel } from './models';
export class V1GetDiscountsHttpQuery {
  limit?: number;
  offset?: number;
}

export class V1GetDiscountsHttpResponse {
  discounts: V1DiscountModel[] | null;
}
