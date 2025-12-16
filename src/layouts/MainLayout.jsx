import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main column */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sticky Header */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-auto p-4">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
