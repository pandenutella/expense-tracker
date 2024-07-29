export const sortByProperty = (property) => (a, b) =>
  a[property] > b[property] ? 1 : -1;
