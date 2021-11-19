export const getItemsFromLocalStorage = (key) => {
  const items = localStorage.getItem(key);

  if (items) {
    return JSON.parse(items);
  }

  return [];
};

export const getItemFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return {};
};

export const saveItemToLocalStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};
