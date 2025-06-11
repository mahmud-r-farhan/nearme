'use client';

import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { acceptFriendRequest, getFriendRequests } from '@/lib/api';
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from 'lucide-react';
import NoNotificationsFound from '@/components/NoNotificationsFound';

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-100">
      <div className="container mx-auto max-w-4xl space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-6"
        >
          Notifications
        </motion.h1>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-12"
          >
            <span className="animate-spin h-10 w-10 border-4 border-t-blue-500 border-gray-200 rounded-full"></span>
          </motion.div>
        ) : (
          <AnimatePresence>
            {incomingRequests.length > 0 && (
              <motion.section
                key="incoming-requests"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                  <UserCheckIcon className="h-5 w-5 text-blue-500" />
                  Friend Requests
                  <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {incomingRequests.length}
                  </span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <motion.div
                      key={request._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-lg"
                    >
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden relative">
                            <Image
                              src={request.sender.profilePic}
                              alt={request.sender.fullName}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{request.sender.fullName}</h3>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                                Native: {request.sender.nativeLanguage}
                              </span>
                              <span className="border border-gray-300 text-gray-600 text-xs font-medium px-2 py-0.5 rounded">
                                Learning: {request.sender.learningLanguage}
                              </span>
                            </div>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => acceptRequestMutation(request._id)}
                          disabled={isPending}
                          className={`px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors ${
                            isPending ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Accept
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {acceptedRequests.length > 0 && (
              <motion.section
                key="accepted-requests"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                  <BellIcon className="h-5 w-5 text-green-500" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <motion.div
                      key={notification._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white shadow-sm rounded-lg"
                    >
                      <div className="p-4 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative">
                          <Image
                            src={notification.recipient.profilePic}
                            alt={notification.recipient.fullName}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">
                            {notification.recipient.fullName}
                          </h3>
                          <p className="text-sm text-gray-600 my-1">
                            {notification.recipient.fullName} accepted your friend request
                          </p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <ClockIcon className="h-3 w-3 mr-1" />
                            Recently
                          </p>
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded flex items-center">
                          <MessageSquareIcon className="h-3 w-3 mr-1" />
                          New Friend
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <NoNotificationsFound />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;