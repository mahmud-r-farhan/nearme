'use client';

import { motion } from 'framer-motion';
import { BellIcon } from 'lucide-react';

function NoNotificationsFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4"
      >
        <BellIcon className="w-8 h-8 text-gray-600 opacity-40" />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-lg font-semibold text-gray-800 mb-2"
      >
        No notifications yet
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="text-gray-600 opacity-70 max-w-md"
      >
        When you receive friend requests or messages, they'll appear here.
      </motion.p>
    </motion.div>
  );
}

export default NoNotificationsFound;