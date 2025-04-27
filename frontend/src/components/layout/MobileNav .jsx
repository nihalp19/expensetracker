import React from 'react';
import { motion } from 'framer-motion';
import { Home, PieChart, CreditCard, BarChart3, Settings } from 'lucide-react';

const MobileNav = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: <Home size={20} /> },
    { id: 'expenses', label: 'Expenses', icon: <CreditCard size={20} /> },
    { id: 'budgets', label: 'Budgets', icon: <PieChart size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
    >
      <div className="flex justify-between relative">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-1 flex-col items-center justify-center py-3 relative ${
              activeTab === item.id
                ? 'text-primary-600'
                : 'text-gray-500 hover:text-gray-900'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
            {activeTab === item.id && (
              <motion.div
                className="w-6 h-1 bg-primary-500 absolute top-0 rounded-b-lg"
                layoutId="activeTabMobile"
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileNav;
