export const apiResponse = (
  status: number,
  description: string,
  type?: 'object' | 'array',
  schema?: any,
) => {
  const response = {
    status: status,
    description: description,
    schema: null,
  };

  if (schema && type) {
    if (type === 'array')
      response.schema = {
        type: type,
        items: {
          properties: {
            ...schema,
          },
        },
      };
    else
      response.schema = {
        type: type,
        properties: {
          ...schema,
        },
      };
  }

  return response;
};
