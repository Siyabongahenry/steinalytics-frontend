import { NavLink } from "react-router-dom";
import { XMarkIcon, HomeIcon, UsersIcon, DocumentIcon,ClockIcon } from "@heroicons/react/24/outline";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const links = [
    { to: "/home", name: "Home", icon: HomeIcon },
    { to: "/site", name: "Site Statistics", icon: UsersIcon },
    { to: "/devices", name: "Clocking Machines", icon: ClockIcon },
     { to: "/reports", name: "Reports", icon:  DocumentIcon }

  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-800 text-white transform lg:translate-x-0 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:inset-auto lg:translate-x-0 flex flex-col`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex-1 flex flex-col space-y-2 p-4 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700 transition ${
                    isActive ? "bg-gray-700 font-semibold" : ""
                  }`
                }
                onClick={() => setSidebarOpen(false)} // close on mobile
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
