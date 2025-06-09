import {
  HomeIcon,
  UsersIcon,
  CalendarSearch,
  Rss,
  MessageCircleMore,
  BellIcon,
  Settings,
} from "lucide-react";

// Main navigation items
export const mainNavItems = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/friends", icon: UsersIcon, label: "Friends" },
  { href: "/events", icon: CalendarSearch, label: "Events" },
  { href: "/posts", icon: Rss, label: "Posts" },
  { href: "/chats", icon: MessageCircleMore, label: "Chats" },
];

// Top navbar icons
export const topNavItems = [
  { href: "/notifications", icon: BellIcon, label: "Notifications", badge: true },
  { href: "/settings", icon: Settings, label: "Settings" },
];
