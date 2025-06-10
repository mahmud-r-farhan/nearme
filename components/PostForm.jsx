'use client';
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner"; // Import from sonner directly
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { ImageIcon, XIcon, LoaderIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PostForm({ onNewPost }) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const fileInputRef = useRef(null);

  const validateContent = (text) => {
    if (text.length > 500) {
      return { isValid: false, reason: "Content must be less than 500 characters" };
    }
    if (text.trim().length === 0) {
      return { isValid: false, reason: "Content cannot be empty" };
    }
    return { isValid: true, reason: "" };
  };

  useEffect(() => {
    if (content.trim()) {
      const validation = validateContent(content);
      setIsValid(validation.isValid);
      setValidationMessage(validation.reason);
    }
  }, [content]);

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatar = createAvatar(lorelei, {
        seed: Math.random().toString(),
        size: 128,
      });
      try {
        const uri = await avatar.toDataUri();
        setProfilePicture(uri);
      } catch (error) {
        console.error("Error generating avatar:", error);
        setProfilePicture("/placeholder.svg");
      }
    };
    fetchAvatar();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB"); // Updated to use Sonner's error method
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("content", content);
    formData.append("author", author || "Anonymous");
    formData.append("profilePicture", profilePicture);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newPost = {
        ...response.data,
        profilePicture: response.data.profilePicture || getRandomAvatar(response.data.author + response.data._id),
      };
      onNewPost(newPost);
      setContent("");
      setAuthor("");
      setImage(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast("Post created successfully!"); // Updated to use Sonner
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create post"); // Updated to use Sonner's error method
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={profilePicture} alt="Profile" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <Input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Anonymous"
          className="flex-1"
        />
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts anonymously..."
        className="w-full"
        rows={4}
      />
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary cursor-pointer">
          <ImageIcon className="w-5 h-5" />
          <span>Add Image</span>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
          />
        </label>
        <Button
          type="submit"
          disabled={isLoading || !isValid || !content.trim()}
          className="ml-auto"
        >
          {isLoading && <LoaderIcon className="w-5 h-5 animate-spin mr-2" />}
          {isLoading ? "Creating..." : "Post Anonymously"}
        </Button>
      </div>
      {!isValid && (
        <div className="mt-2 text-red-500 text-sm">{validationMessage}</div>
      )}
      {preview && (
        <div className="relative mt-4">
          <motion.img
            src={preview}
            alt="Preview"
            className="max-h-96 w-full object-cover rounded-lg"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <Button
            type="button"
            onClick={() => {
              setPreview(null);
              setImage(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
            size="icon"
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      )}
    </motion.form>
  );
}