export class CreateMemberDto {
  username: string;
  password: string;
  fullName? = 'Default User';
}

export class CreateStaffDto {
  username: string;
  password: string;
  fullName?: string;
}

export class CreateShipperDto {
  username: string;
  password: string;
  fullName?: string;
  phone?: string;
}

export class CreateAdminDto {
  username: string;
  password: string;
  fullName? = 'Default User';
}

export class CreateUserDto {
  username: string;
  password: string;
  fullName?: string;
  role: string;
  email?: string;
  phone?: string;
}

export class UpdateUserDto {
  password?: string;
  fullName?: string;
  phone?: string;
  email?: string;
}
