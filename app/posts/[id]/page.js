'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import CommentForm from "@/components/CommentForm";
import Comment from "@/components/Comment";
import LoadingSpinner from "@/components/ui/PageLoader";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRandomAvatar } from "@/utils/avatarUtils";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        const postData = response.data;
        // Set random avatar if profilePicture is missing or API fails
        if (!postData.profilePicture) {
          postData.profilePicture = getRandomAvatar(postData.author + postData._id);
        }
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
        // Fallback to random avatar on API failure
        setPost((prev) => ({
          ...prev,
          profilePicture: getRandomAvatar(Math.random().toString()),
        }));
      }
    };
    getPost();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`/api/posts/${id}/like`);
      setPost(response.data);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentAdded = (newComment) => {
    setPost((prev) => {
      const updatedPost = { ...prev };
      if (newComment.parentId) {
        const parentComment = updatedPost.comments.find((c) => c._id === newComment.parentId);
        if (parentComment) {
          if (!parentComment.replies) parentComment.replies = [];
          parentComment.replies.push(newComment);
        }
      } else {
        updatedPost.comments.push(newComment);
      }
      return updatedPost;
    });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Post by ${post.author}`,
          text: post.content,
          url: window.location.href,
        });
        toast("Post shared successfully!"); // Updated to use Sonner
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast("Link copied to clipboard!"); // Updated to use Sonner
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        toast.error("Failed to share post"); // Updated to use Sonner's error variant
      }
    }
  };

  if (!post) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
    >
      <div className="flex items-center mb-4">
        <Avatar className="w-10 h-10 mr-4">
          <AvatarImage src={post.profilePicture} alt="Profile" />
          <AvatarFallback>{post.author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-bold">{post.author}</h3>
          <p className="text-sm text-gray-500">{format(new Date(post.createdAt), "PPP")}</p>
        </div>
      </div>
      <p className="mb-4">{post.content}</p>
      {post.image && (
        <motion.img
          src={post.image}
          alt="Post"
          className="w-full h-auto rounded-lg mb-4"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <Button variant="ghost" onClick={handleLike} className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
              />
            </svg>
            <span>{post.comments.length}</span>
          </Button>
        </div>
        <Button variant="ghost" onClick={handleShare} className="flex items-center space-x-1">
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </Button>
      </div>
      <div className="mt-8">
        <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
      </div>
      <div className="space-y-4 mt-6">
        {post.comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            postId={id}
            onCommentAdded={handleCommentAdded}
          />
        ))}
      </div>
    </motion.div>
  );
}