import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { XMarkIcon, HomeIcon, UsersIcon,UserIcon, DocumentIcon,InformationCircleIcon,BookOpenIcon, EnvelopeIcon  } from "@heroicons/react/24/outline";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

 const side_bar_links =  [
    { to: "/home", name: "Home", icon: HomeIcon },
     { to: "/profile", name: "Profile", icon: UserIcon },
    { to: "/statistics", name: "Statistics", icon: UsersIcon },
    { to: "/reports", name: "Reports", icon:  DocumentIcon },
    { to: "/email-organizer", name: "Email Organizer", icon:  EnvelopeIcon },
    { to: "/library", name: "Library", icon:  BookOpenIcon },
    { to: "/about", name: "About", icon:  InformationCircleIcon }

  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Fixed Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} side_bar_links={side_bar_links} />

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Scrollable content + footer */}
        <div className="flex-1 overflow-auto p-4">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
