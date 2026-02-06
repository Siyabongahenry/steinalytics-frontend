import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { XMarkIcon, HomeIcon, UsersIcon,UserIcon, DocumentIcon,InformationCircleIcon,BookOpenIcon, EnvelopeIcon  } from "@heroicons/react/24/outline";
export default function DashboardLayout({ children })
{
     const side_bar_links = [
    { to: "/home", name: "Dashboard", icon: HomeIcon },
    { to: "/reports", name: "Manage Reports", icon:  DocumentIcon },
    { to: "/library", name: "Manage Library", icon:  BookOpenIcon },
    { to: "/about", name: "About", icon:  InformationCircleIcon }
     ]
     const [sidebarOpen, setSidebarOpen] = useState(false);

     

    return (
        <div className="flex h-screen bg-gray-900 text-white">
             {/* Fixed Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} side_bar_links={side_bar_links}/>
    
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
    )
}