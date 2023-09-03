import { OrderStatusEnum } from './models';

export class V1UpdateOrderHttpRequest {
  status?: OrderStatusEnum;
  address?: string;
}

export class V1UpdateOrderHttpResponse {
  status: string;
  address: string;

  constructor(options: V1UpdateOrderHttpResponse) {
    this.status = options.status;
    this.address = options.address;
  }
}
