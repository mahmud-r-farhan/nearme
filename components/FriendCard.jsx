"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LANGUAGE_TO_FLAG } from "@/constants/index";

const FriendCard = ({ friend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-4 space-y-3">
        {/* USER INFO */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={friend.profilePic}
              alt={friend.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-gray-800 truncate">{friend.fullName}</h3>
        </div>

        {/* Languages with flags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* Action button */}
        <Link
          href={`/chat/${friend._id}`}
          className="block w-full py-2 px-4 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 text-center hover:bg-gray-50 transition-colors"
        >
          Message
        </Link>
      </div>
    </motion.div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}