export interface LogInRequestDto {
  username: string;
  password: string;
  fullName?: string;
}
export interface UserModel {
  id: string;
  username: string;
  full_name?: string;
}
