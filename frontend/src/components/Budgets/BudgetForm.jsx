import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

// Dummy context and data to make this standalone
const categories = [
  { id: 'food', name: 'Food' },
  { id: 'transport', name: 'Transport' },
  { id: 'entertainment', name: 'Entertainment' },
];

const useExpense = () => {
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const addBudget = (budget) => {
    console.log('Add budget:', budget);
  };
  const updateBudget = (budget) => {
    console.log('Update budget:', budget);
  };
  return { addBudget, updateBudget, currentMonth };
};

export const BudgetForm = ({ onClose, budget }) => {
  const { addBudget, updateBudget, currentMonth } = useExpense();
  const [formData, setFormData] = useState({
    amount: budget?.amount.toString() || '',
    month: budget?.month || currentMonth,
    categoryId: budget?.categoryId || categories[0].id,
  });
  const [errors, setErrors] = useState({ amount: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { amount: '' };
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (budget) {
      updateBudget({
        id: budget.id,
        amount: parseFloat(formData.amount),
        month: formData.month,
        categoryId: formData.categoryId,
      });
    } else {
      addBudget({
        amount: parseFloat(formData.amount),
        month: formData.month,
        categoryId: formData.categoryId,
      });
    }
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {budget ? 'Edit Budget' : 'Set New Budget'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="categoryId" className="label">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="input"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="month" className="label">Month</label>
            <input
              type="month"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="label">Budget Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              min="0.01"
              value={formData.amount}
              onChange={handleChange}
              className={`input ${errors.amount ? 'border-error-500 focus:ring-error-500' : ''}`}
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-error-600">{errors.amount}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {budget ? 'Update' : 'Set'} Budget
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

