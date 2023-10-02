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
}

export class UpdateUserDto {
  password?: string;
  fullName?: string;
}
