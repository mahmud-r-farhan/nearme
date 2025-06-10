'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Heart, Reply, MoreVertical } from "lucide-react";
import CommentForm from "@/components/CommentForm";
import { toast } from "sonner";
import { useAvatar } from "@/contexts/AvatarContext";
import { getRandomAvatar } from "@/utils/avatarUtils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Comment({ comment, postId, onCommentAdded, depth = 0 }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes || 0);
  const { username } = useAvatar();

  useEffect(() => {
    setIsLiked(comment.likedBy?.includes(username));
    setLikesCount(comment.likes || 0);
  }, [comment.likedBy, comment.likes, username]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/posts/${postId}/comments/${comment._id}/like`, {
        username,
      });
      setIsLiked(response.data.liked);
      setLikesCount(response.data.likes);
      comment.likedBy = response.data.likedBy;
      comment.likes = response.data.likes;
    } catch (error) {
      console.error("Error liking comment:", error);
      toast.error("Failed to like comment"); // Updated to use Sonner's error method
    }
  };

  const handleReplySubmit = (newReply) => {
    onCommentAdded({
      ...newReply,
      parentId: comment._id,
    });
    setShowReplyForm(false);
  };

  return (
    <motion.div
      className="pl-4 border-l-2 border-gray-200 dark:border-gray-700 my-4"
      style={{ marginLeft: `${depth * 16}px` }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-3">
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={comment.profilePicture || getRandomAvatar(comment.author + comment._id)}
            alt={comment.author}
          />
          <AvatarFallback>{comment.author[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{comment.author}</h4>
                <p className="text-sm text-gray-500">
                  {format(new Date(comment.createdAt), "PPp")}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical size={16} />
              </Button>
            </div>
            <p className="mt-2">{comment.content}</p>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <Button
              variant="ghost"
              onClick={handleLike}
              className="flex items-center space-x-1 text-sm"
            >
              <Heart size={16} fill={isLiked ? "red" : "none"} stroke={isLiked ? "red" : "currentColor"} />
              <span>{likesCount}</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center space-x-1 text-sm"
            >
              <Reply size={16} />
              <span>Reply</span>
            </Button>
          </div>
          {showReplyForm && depth < 3 && (
            <div className="mt-3">
              <CommentForm
                postId={postId}
                parentId={comment._id}
                onCommentAdded={handleReplySubmit}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          )}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  postId={postId}
                  onCommentAdded={onCommentAdded}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}