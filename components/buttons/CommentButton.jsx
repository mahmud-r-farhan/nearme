export default function CommentButton({ post }) {
  if (!post || !post._id) {
    return null; // or render a fallback UI
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant="ghost"
        asChild
        className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        aria-label="View comments"
      >
        <Link href={`/post/${post._id}`}>
          <MessageSquare className="h-5 w-5" />
          <span>{post.comments?.length || 0}</span>
        </Link>
      </Button>
    </motion.div>
  );
}