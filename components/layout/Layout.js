"use client";

import Sidebar from "../shared/Sidebar";
import Navbar from "../shared/Navbar";
import BottomNavbar from "../shared/BottomNavbar";

export default function Layout({ children, showSidebar = true }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main className="flex-1 overflow-y-auto lg:ml-0">
          {children}
        </main>
      </div>
      <BottomNavbar />
    </div>
  );
}
