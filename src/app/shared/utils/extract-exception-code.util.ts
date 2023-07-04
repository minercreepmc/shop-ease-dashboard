export interface ApiException {
  code: string;
  message: string;
}

export function extractExceptionCode(exceptions: ApiException[]) {
  const extractedException = new Map<string, string[]>();

  exceptions.forEach((exception) => {
    const field = exception.code.split('.')[0].toLowerCase();
    if (extractedException.has(field)) {
      const existing = extractedException.get(field) as string[];
      existing?.push(exception.message);
      extractedException.set(field, existing);
    } else {
      extractedException.set(field, [exception.message]);
    }
  });

  return extractedException;
}
