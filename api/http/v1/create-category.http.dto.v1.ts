export class V1CreateCategoryHttpRequest {
  name: string;
  description?: string;
}

export class V1CreateCategoryHttpResponse {
  id: string;
  name: string;
  description?: string;
  message: string;

  constructor(response: Omit<V1CreateCategoryHttpResponse, 'message'>) {
    this.id = response.id;
    this.name = response.name;
    this.description = response.description;
    this.message = 'Category created successfully';
  }
}
