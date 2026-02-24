import { menuData } from '@/data/menuData';

// Initialize local storage with menuData if empty
export const initDB = () => {
  if (!localStorage.getItem('categories')) {
    const categories = menuData.map(c => ({ id: c.id, name: c.name }));
    localStorage.setItem('categories', JSON.stringify(categories));
  }
  if (!localStorage.getItem('dishes')) {
    const dishes = menuData.flatMap(c => c.items.map(i => ({ ...i, categoryId: c.id })));
    localStorage.setItem('dishes', JSON.stringify(dishes));
  }
};

export const getCategories = () => {
  initDB();
  return JSON.parse(localStorage.getItem('categories')) || [];
};

export const saveCategories = (cats) => {
  localStorage.setItem('categories', JSON.stringify(cats));
};

export const getDishes = () => {
  initDB();
  return JSON.parse(localStorage.getItem('dishes')) || [];
};

export const saveDishes = (dishes) => {
  localStorage.setItem('dishes', JSON.stringify(dishes));
};