import { AddressModel } from '@model';

export class UserRO {
  id: string;
  full_name: string;
  username: string;
  role: string;
  addresses?: AddressModel[];
  phone?: string;
  email?: string;
}
