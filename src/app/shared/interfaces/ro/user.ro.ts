import { AddressModel } from '@model';
import { PaginateRO, PaginiateMetaRO } from './paginate.ro';

export class UserDataRO {
  id: string;
  full_name: string;
  username: string;
  role: string;
  addresses?: AddressModel[];
  phone?: string;
  email?: string;
}

export class ShipperGetAllDataRO extends UserDataRO {
  shipping_count: number;
}

export class ShipperGetAllRO implements PaginateRO<ShipperGetAllDataRO> {
  data: ShipperGetAllDataRO[];
  meta: PaginiateMetaRO;
}
