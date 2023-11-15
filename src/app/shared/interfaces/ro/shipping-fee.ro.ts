import { ShippingFeeModel } from '@model';

export class ShippingFeeGetAllDataRO implements ShippingFeeModel {
  id: string;
  name: string;
  fee: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export class ShippingFeeGetAllRO {
  data: ShippingFeeGetAllDataRO[];
}

export class ShippingFeeGetOneRO extends ShippingFeeGetAllDataRO {}
export class ShippingFeeStoreRO extends ShippingFeeGetAllDataRO {}
export class ShippingFeeUpdateRO extends ShippingFeeGetAllDataRO {}
