// src/components/expense/ExpenseForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useExpenseStore } from '../../stores/useExpenseStore';

const ExpenseForm = ({ onClose, expense }) => {
  const { addExpense, updateExpense, categories } = useExpenseStore();

  const [formData, setFormData] = useState({
    amount: expense?.amount.toString() || '',
    date: expense?.date?.split('T')[0] || new Date().toISOString().split('T')[0],
    categoryId: expense?.categoryId || categories[0].id,
    description: expense?.description || '',
  });

  const [errors, setErrors] = useState({ amount: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { amount: '', description: '' };

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please enter a description';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (expense) {
      updateExpense({
        id: expense.id,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date).toISOString(),
        categoryId: formData.categoryId,
        description: formData.description,
      });
    } else {
      addExpense({
        amount: parseFloat(formData.amount),
        date: new Date(formData.date).toISOString(),
        categoryId: formData.categoryId,
        description: formData.description,
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
          <h2 className="text-xl font-semibold">{expense ? 'Edit Expense' : 'Add New Expense'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="amount" className="label">
              Amount
            </label>
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
            {errors.amount && <p className="mt-1 text-sm text-error-600">{errors.amount}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="label">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="categoryId" className="label">
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="input"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="label">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`input ${errors.description ? 'border-error-500 focus:ring-error-500' : ''}`}
              placeholder="Lunch with colleagues"
            />
            {errors.description && <p className="mt-1 text-sm text-error-600">{errors.description}</p>}
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {expense ? 'Update' : 'Add'} Expense
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ExpenseForm;
