import { AddressModel } from '@model';

export class LoginResponseRO {
  cookie: string;
}

export class ProfileRO {
  username: string;
  full_name: string;
  addresses: AddressModel[];
}
