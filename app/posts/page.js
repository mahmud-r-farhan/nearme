'use client';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import RightSidebar from '@/components/RightSidebar'; 


const SEO = ({ image, description }) => {
  return (
    <head>
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <title>Anonymous Social Platform</title>
    </head>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchPosts = useCallback(async () => {
    if (!mounted) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://anonymous-posting-app.vercel.app/api/posts');
      setPosts(response.data);
      toast.success('Posts fetched successfully!');
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to fetch posts. Please try again later.');
      toast.error('Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      fetchPosts();
    }
  }, [fetchPosts, mounted]);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    toast.success('Post created successfully!');
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? new Date(post.createdAt) >= dateFilter : true;
    return matchesSearch && matchesDate;
  });

  if (!mounted) {
    return null; // Return null on server-side
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto space-y-8 p-4 md:p-8 relative"
    >
      <SEO
        image="https://res.cloudinary.com/dydnhyxfh/image/upload/v1739117754/image-wtRQg0aGJkPVZemCd-o5s_nc7njv.webp"
        description="Browse anonymous posts and share your thoughts freely."
      />
      {/* Toggle Button for Sidebar */}
      <Button
        variant="outline"
        size="icon"
        className="fixed right-4 top-4 z-50 md:hidden" // Visible only on mobile
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <PostForm onNewPost={handleNewPost} />
      <PostList posts={filteredPosts} isLoading={isLoading} error={error} />
      <RightSidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </motion.div>
  );
}