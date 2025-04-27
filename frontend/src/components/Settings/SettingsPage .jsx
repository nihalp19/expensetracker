import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div>
      <motion.h2 
        className="text-2xl font-bold mb-6 text-purple-900"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        Settings
      </motion.h2>
      
      <motion.div
        className="card bg-white/80 backdrop-blur-sm border border-purple-100 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-purple-900">Display Settings</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="dateFormat" className="label text-purple-900">Date Format</label>
            <select id="dateFormat" className="input border-purple-100 focus:border-purple-300 focus:ring-purple-200">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="card bg-white/80 backdrop-blur-sm border border-purple-100 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-purple-900">Data Management</h3>
        <div className="space-y-4">
          <div>
            <button className="btn btn-secondary w-full justify-center bg-purple-100 hover:bg-purple-200 text-purple-900">
              Export Data (CSV)
            </button>
            <p className="text-xs text-purple-600 mt-1">Download your expense data in CSV format</p>
          </div>
          
          <div>
            <button className="btn btn-secondary w-full justify-center bg-purple-100 hover:bg-purple-200 text-purple-900">
              Backup Data (JSON)
            </button>
            <p className="text-xs text-purple-600 mt-1">Download a complete backup of all your data</p>
          </div>
          
          <div>
            <button className="btn bg-red-100 text-red-800 hover:bg-red-200 w-full justify-center flex items-center">
              <AlertTriangle size={16} className="mr-2" />
              Reset All Data
            </button>
            <p className="text-xs text-red-600 mt-1">Delete all your data and start fresh (cannot be undone)</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
