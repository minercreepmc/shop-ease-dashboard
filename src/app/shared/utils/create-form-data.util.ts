export interface CreateFormDataOptions {
  dto: any;
  nestedKeys?: string[];
}

export function createFormData(options: CreateFormDataOptions): FormData {
  const { dto, nestedKeys = [] } = options;
  const formData = new FormData();

  for (const dataKey in dto) {
    if (Array.isArray(dto[dataKey])) {
      for (const nestedKey in dto[dataKey]) {
        formData.append(`${dataKey}[]`, dto[dataKey][nestedKey]);
      }
    } else if (
      nestedKeys.includes(dataKey) &&
      typeof dto[dataKey] === 'object'
    ) {
      for (const nestedKey in dto[dataKey]) {
        formData.append(`${dataKey}[${nestedKey}]`, dto[dataKey][nestedKey]);
      }
    } else {
      formData.append(dataKey, dto[dataKey]);
    }
  }

  return formData;
}
