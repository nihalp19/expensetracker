import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, DollarSign } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      className="bg-white shadow-sm py-4 px-4 md:px-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.div
            className="bg-primary-500 text-white p-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DollarSign size={24} />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ExpenseTracker</h1>
            <p className="text-xs text-gray-500">Manage your finances with ease</p>
          </div>
        </div>
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button className="btn btn-secondary flex items-center">
            <BarChart3 size={16} className="mr-1" /> 
            <span>Reports</span>
          </button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
