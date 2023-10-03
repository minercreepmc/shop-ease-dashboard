export class OrderModel {
  id: string;
  status: string;
  total_price: number;
  fee_id: string;
  address_id: string;

  constructor(dto: OrderModel) {
    this.id = dto.id;
    this.status = dto.status;
    this.total_price = dto.total_price;
    this.fee_id = dto.fee_id;
    this.address_id = dto.address_id;
  }
}
