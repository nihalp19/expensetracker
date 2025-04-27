import { v4 as uuidv4 } from 'uuid';

export const categories = [
  {
    id: uuidv4(),
    name: 'Food & Dining',
    color: '#FF5252',
    icon: 'utensils',
  },
  {
    id: uuidv4(),
    name: 'Travel',
    color: '#448AFF',
    icon: 'plane',
  },
  {
    id: uuidv4(),
    name: 'Shopping',
    color: '#9C27B0',
    icon: 'shopping-bag',
  },
  {
    id: uuidv4(),
    name: 'Entertainment',
    color: '#FF9800',
    icon: 'film',
  },
  {
    id: uuidv4(),
    name: 'Tech',
    color: '#2196F3',
    icon: 'laptop',
  },
  {
    id: uuidv4(),
    name: 'Housing',
    color: '#4CAF50',
    icon: 'home',
  },
  {
    id: uuidv4(),
    name: 'Transportation',
    color: '#607D8B',
    icon: 'car',
  },
  {
    id: uuidv4(),
    name: 'Health',
    color: '#E91E63',
    icon: 'activity',
  },
  {
    id: uuidv4(),
    name: 'Education',
    color: '#3F51B5',
    icon: 'book',
  },
  {
    id: uuidv4(),
    name: 'Other',
    color: '#795548',
    icon: 'more-horizontal',
  },
];

export function getCategoryById(id) {
  return categories.find(category => category.id === id);
}

export function getCategoryByName(name) {
  return categories.find(category => category.name.toLowerCase() === name.toLowerCase());
}
