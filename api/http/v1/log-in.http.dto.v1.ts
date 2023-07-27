export class V1LogInHttpRequest {
  username: string;
  password: string;
}

export class V1LogInHttpResponse {
  cookie: string;

  constructor(options: V1LogInHttpResponse) {
    this.cookie = options.cookie;
  }
}
