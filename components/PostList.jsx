'use client';
import Link from "next/link";
import { format } from "date-fns";
import { getRandomAvatar } from "@/utils/avatarUtils";
import { getOptimizedImageUrl } from "@/utils/cloudinaryConfig";
import LikeButton from "@/components/buttons/LikeButton";
import CommentButton from "@/components/buttons/CommentButton";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoaderIcon } from "lucide-react";

export default function PostList({ posts, isLoading, error }) {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoaderIcon className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading posts...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // No posts state
  if (sortedPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No posts found.</p>
      </div>
    );
  }

  // Normal rendering with posts
  return (
    <div className="grid gap-6 p-4">
      {sortedPosts.map((post, index) => (
        <motion.div
          key={post._id}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={post.profilePicture || getRandomAvatar(post.author + post._id)}
                alt="Profile"
              />
              <AvatarFallback>{post.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.author}</h3>
              <p className="text-sm text-gray-500">
                {format(new Date(post.createdAt), "PPP")}
              </p>
            </div>
          </div>
          <p className="mb-4 text-gray-800 dark:text-gray-300">{post.content}</p>
          {post.image && (
            <motion.img
              src={getOptimizedImageUrl(post.image)}
              alt="Post content"
              className="w-full h-60 rounded-lg object-cover mb-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4">
              <LikeButton post={post} />
              <CommentButton postId={post._id} commentCount={post.comments.length} />
            </div>
            <Link href={`/posts/${post._id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}