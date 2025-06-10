'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from '@/lib/api';
import Link from 'next/link';
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { capitialize } from '@/lib/utils';
import FriendCard, { getLanguageFlag } from '@/components/FriendCard';
import NoFriendsFound from '@/components/NoFriendsFound';

export default function HomePage() {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ['outgoingFriendReqs'],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['outgoingFriendReqs'] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

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

        {/* Recommended Users Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Meet New Learners
                </h2>
                <p className="text-gray-600 mt-1">
                  Discover perfect language exchange partners based on your profile
                </p>
              </div>
            </div>
          </motion.div>

          {loadingUsers ? (
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
          ) : recommendedUsers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                No recommendations available
              </h3>
              <p className="text-gray-600">
                Check back later for new language partners!
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img
                            src={user.profilePic}
                            alt={user.fullName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPinIcon className="h-3 w-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Languages with flags */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {capitialize(user.nativeLanguage)}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                          {getLanguageFlag(user.learningLanguage)}
                          Learning: {capitialize(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && <p className="text-sm text-gray-600">{user.bio}</p>}

                      {/* Action button */}
                      <button
                        className={`w-full py-2 mt-2 rounded-md text-sm font-medium flex items-center justify-center ${
                          hasRequestBeenSent
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        } transition-colors`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="h-4 w-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="h-4 w-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
}