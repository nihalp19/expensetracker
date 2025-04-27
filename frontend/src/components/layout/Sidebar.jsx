import React from 'react';
import { motion } from 'framer-motion';
import { Home, PieChart, CreditCard, BarChart3, Settings } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'expenses', label: 'Expenses', icon: <CreditCard size={20} /> },
    { id: 'budgets', label: 'Budgets', icon: <PieChart size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside
      className="bg-white shadow-sm border-r border-gray-200 w-64 hidden md:block flex-shrink-0 relative"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4">
        <nav className="mt-8 space-y-1 relative">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition relative ${
                activeTab === item.id
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
              {activeTab === item.id && (
                <motion.div
                  className="w-1 h-6 bg-primary-500 absolute right-0 rounded-l-lg"
                  layoutId="activeTab"
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
