// components/Layout/OwnerLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  Bell,
  BookOpen,
  LogOut,
} from "lucide-react";
import { useUser } from "../../context/UserContext";

export default function OwnerLayout() {
  const { user, logout } = useUser();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, to: "/owner-dashboard" },
    { name: "Alerts", icon: <Bell className="w-5 h-5"/>, to: "/alerts"},
    { name: "Add Property", icon: <Plus className="w-5 h-5" />, to: "/add-property" },
    { name: "Passbook", icon: <BookOpen className="w-5 h-5" />, to: "/passbook" },
    { name: "Logout", icon: <LogOut className="w-5 h-5" />, to: "/", onClick: logout },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-indigo-100">
      <aside className="hidden w-64 bg-white shadow p-6 md:flex flex-col">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-indigo-700">Owner Panel</h2>
          <p className="text-sm text-gray-500">{user?.name || "Welcome"}</p>
        </div>

        <nav className="space-y-3">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              onClick={item.onClick}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition 
                ${isActive ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-indigo-50"}`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 py-24">
        <Outlet />
      </main>
    </div>
  );
}
