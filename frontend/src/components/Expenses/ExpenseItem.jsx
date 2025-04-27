import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { getCategoryById } from '../../data/categories';

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const category = getCategoryById(expense.categoryId);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-4 mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      layout
      transition={{ type: 'spring', damping: 15 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {category && (
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: category.color + '20' }}
            >
              <span style={{ color: category.color }}>
                {category.icon.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <h4 className="font-medium text-gray-900">{expense.description}</h4>
            <div className="flex items-center text-sm text-gray-500">
              <span>{formatDate(expense.date)}</span>
              <span className="mx-2">•</span>
              <span 
                className="badge" 
                style={{ backgroundColor: category?.color + '20', color: category?.color }}
              >
                {category?.name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <p className="font-semibold text-lg mr-4">{formatCurrency(expense.amount)}</p>
          <div className="flex space-x-1">
            <motion.button
              onClick={() => onEdit(expense)}
              className="p-2 text-gray-500 hover:text-primary-600 rounded-full hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit size={16} />
            </motion.button>
            <motion.button
              onClick={() => onDelete(expense.id)}
              className="p-2 text-gray-500 hover:text-error-600 rounded-full hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseItem;
