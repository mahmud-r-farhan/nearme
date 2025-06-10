'use client';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function LikeButton({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      const response = await axios.post(`/api/posts/${post._id}/like`);
      setLikes(response.data.likes);
      toast.success('Post liked!');
    } catch (error) {
      toast.error('Failed to like post');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="ghost"
        onClick={handleLike}
        disabled={isLiking}
        className="flex items-center space-x-2 text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        aria-label="Like post"
      >
        <Heart
          className={`h-5 w-5 ${isLiking ? 'animate-pulse' : ''}`}
          fill={isLiking ? 'currentColor' : 'none'}
          stroke="currentColor"
        />
        <span>{likes}</span>
      </Button>
    </motion.div>
  );
}