import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import ExpenseItem from './ExpenseItem';
import { categories } from '../../data/categories';
import { getMonthFromDate, formatCurrency } from '../../utils/formatters';

const ExpenseList = ({ expenses, onEdit, onDelete, currentMonth }) => {
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    let result = [...expenses].filter(expense => 
      getMonthFromDate(expense.date) === currentMonth
    );

    if (searchTerm) {
      result = result.filter(expense => 
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(expense => expense.categoryId === selectedCategory);
    }

    result.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
    });

    setFilteredExpenses(result);
  }, [expenses, searchTerm, selectedCategory, sortBy, sortOrder, currentMonth]);

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="card bg-white/80 backdrop-blur-sm border border-purple-100">
        <div className="mb-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-purple-400" />
              </div>
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 border-purple-100 focus:border-purple-300 focus:ring-purple-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input pr-10 appearance-none border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Filter size={18} className="text-purple-400" />
                </div>
              </div>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="input border-purple-100 focus:border-purple-300 focus:ring-purple-200"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-purple-900 font-medium">Total Amount:</span>
            <span className="text-lg font-bold text-purple-900">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map(expense => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-6"
            >
              <p className="text-purple-600">No expenses found</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpenseList;
