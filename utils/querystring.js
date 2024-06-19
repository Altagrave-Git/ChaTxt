export const queryString = (params) => {
  const paramList = [];
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      paramList.push(`${key}=${value}`);
    }
  })
  return paramList.length ? `?${paramList.join('&')}` : '';
};