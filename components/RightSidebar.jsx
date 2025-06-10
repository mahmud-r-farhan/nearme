'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RightSidebar({
  searchTerm,
  setSearchTerm,
  dateFilter,
  setDateFilter,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ x: '10%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '10%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed right-0 top-4 z-40 w-64 h-full bg-white dark:bg-gray-800 p-4 shadow-lg md:w-72 md:static md:h-auto md:top-20 md:rounded-lg md:shadow-md"
        >
          {/* Close Button for Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="space-y-4 mt-12 md:mt-0">
            <div className="space-y-2">
              <label
                htmlFor="search"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Search Posts
              </label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search by content or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="date"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Filter by Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="date"
                  type="date"
                  onChange={(e) =>
                    setDateFilter(e.target.value ? new Date(e.target.value) : null)
                  }
                  className="pl-8"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}