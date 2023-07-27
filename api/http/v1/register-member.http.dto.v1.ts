export class V1RegisterMemberHttpRequest {
  username: string;
  password: string;
}

export class V1RegisterMemberHttpResponse {
  username: string;
  message?: string;

  constructor(dto: Omit<V1RegisterMemberHttpResponse, 'message'>) {
    this.username = dto.username;
    this.message = 'Member registered successfully.';
  }
}
