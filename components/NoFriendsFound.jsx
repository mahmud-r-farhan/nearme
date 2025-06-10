"use client";

import { motion } from "framer-motion";

const NoFriendsFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-md text-center"
    >
      <h3 className="font-semibold text-lg text-gray-800 mb-2">No friends yet</h3>
      <p className="text-gray-600">
        Find friends and fun!
      </p>
    </motion.div>
  );
};

export default NoFriendsFound;