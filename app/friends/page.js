'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { UsersIcon } from 'lucide-react';
import { getUserFriends } from '@/lib/api';
import FriendCard from '@/components/FriendCard';
import NoFriendsFound from '@/components/NoFriendsFound';

export default function Friends() {
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends,
  });

  return (
    <div className="p-4 sm:p-6 lg:pl-72 lg:pr-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto space-y-10 pb-20 lg:pb-8">
        {/* Friends Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Friends</h2>
          <Link
            href="/notifications"
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <UsersIcon className="mr-2 h-4 w-4" />
            Friend Requests
          </Link>
        </motion.div>

        {/* Friends List */}
        {loadingFriends ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-12"
          >
            <svg
              className="animate-spin h-10 w-10 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
              />
            </svg>
          </motion.div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {friends.map((friend) => (
              <motion.div
                key={friend._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FriendCard friend={friend} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}