import { StorageItem } from "../interfaces/MainInterfaces";

const storeItem = (name: string, item: StorageItem) => {
  if (name && item && name !== "r/") {
    localStorage.setItem(name, JSON.stringify(item));
  }
};

const fetchFromStorage = (name: string) => {
  const item = localStorage.getItem(name);

  return item ? JSON.parse(item) : null;
};

export { storeItem, fetchFromStorage };
