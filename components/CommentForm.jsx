'use client';
import { useState } from "react";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";
import { useAvatar } from "@/contexts/AvatarContext";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CommentForm({ postId, parentId = null, onCommentAdded, onCancel }) {
  const [comment, setComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { userAvatar, username, updateUsername } = useAvatar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const loadingToast = toast.loading(parentId ? "Adding reply..." : "Adding comment...");
    try {
      const response = await axios.post(`/api/posts/${postId}/comments`, {
        content: comment,
        author: username,
        profilePicture: userAvatar,
        parentId,
      });
      const newComment = {
        ...response.data,
        profilePicture: response.data.profilePicture || getRandomAvatar(response.data.author + response.data._id),
      };
      onCommentAdded(newComment);
      setComment("");
      setIsExpanded(false);
      if (onCancel) onCancel();
      toast(parentId ? "Reply added!" : "Comment added!"); // Updated to use Sonner
    } catch (error) {
      toast.error("Failed to add comment"); // Updated to use Sonner's error method
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {!isExpanded ? (
        <Button
          variant="ghost"
          type="button"
          onClick={() => setIsExpanded(true)}
          className="flex items-center space-x-2"
        >
          <MessageSquare size={20} />
          <span>{parentId ? "Add a reply" : "Add a comment"}</span>
        </Button>
      ) : (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={userAvatar} alt="Profile" />
              <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
            <Input
              value={username}
              onChange={(e) => updateUsername(e.target.value)}
              placeholder="Your name (optional)"
              className="flex-1 max-w-xs"
            />
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={parentId ? "Write a reply..." : "Write a comment..."}
            className="w-full"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={!comment.trim()}>
              {parentId ? "Reply" : "Comment"}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.form>
  );
}