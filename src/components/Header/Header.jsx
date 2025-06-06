import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import {
  LogIn,
  Menu,
  LayoutDashboard,
  Plus,
  BookOpen,
  LogOut,
  Bell,
  Search,
  House,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import {
  addToast,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout, setUser, refreshUser } = useUser();

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!user);
  }, [user]);

  const logoutUser = async () => {
    let res = await fetch("/api/v1/owners/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      res = await fetch("/api/v1/tenants/logout", {
        method: "POST",
        credentials: "include",
      });
    }

    if (!res.ok) {
      console.log("error logging out");
    } else {
      refreshUser();
    }

    setUser(null);
    localStorage.removeItem("user");
  };

  const handleClick = async () => {
    console.log(1);
    console.log(1);
    await logoutUser();
    console.log(1);

    if (logout) {
      await logout();
      console.log(1);

      addToast({
        title: "User logged out",
      });
      console.log(1);
      setIsLoggedIn(false);
    }
  };

  const ownerNavItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      to: "/owner-dashboard",
    },
    { name: "Alerts", icon: <Bell className="w-5 h-5" />, to: "/owner-alerts" },
    {
      name: "Properties",
      icon: <House className="w-5 h-5" />,
      to: "/owner-properties",
    },
    {
      name: "Add Property",
      icon: <Plus className="w-5 h-5" />,
      to: "/add-property",
    },
    {
      name: "Passbook",
      icon: <BookOpen className="w-5 h-5" />,
      to: "/owner-passbook",
    },
    {
      name: "Logout",
      icon: <LogOut className="w-5 h-5" />,
      to: "/",
      onClick: logout,
    },
  ];

  const tenantNavItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      to: "/tenant-dashboard",
    },
    {
      name: "Alerts",
      icon: <Bell className="w-5 h-5" />,
      to: "/tenant-alerts",
    },
    {
      name: "Properties",
      icon: <House className="w-5 h-5" />,
      to: "/tenant-properties",
    },
    {
      name: "Find Property",
      icon: <Search className="w-5 h-5" />,
      to: "/find-property",
    },
    {
      name: "Passbook",
      icon: <BookOpen className="w-5 h-5" />,
      to: "/tenant-passbook",
    },
    {
      name: "Logout",
      icon: <LogOut className="w-5 h-5" />,
      to: "/",
      onClick: logout,
    },
  ];

  return (
    <header className="w-full fixed z-50 px-6 py-6 bg-white shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-700">RentEase</h1>
      {!user && (
        <nav className="space-x-6 hidden md:block">
          <a
            href="#features"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Features
          </a>
          <a
            href="#reviews"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Reviews
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Contact
          </a>
        </nav>
      )}

      {!user && (
        <NavLink to={"/login"}>
          <button
            variant="outline"
            className="flex items-center gap-2 font-semibold"
          >
            <LogIn className="h-5 w-5" />
            Login
          </button>
        </NavLink>
      )}
      {user && (
        <div className="">
          <NavLink to={"/"}>
            <button
              onClick={handleClick}
              variant="outline"
              className="md:flex items-center gap-2 font-semibold hidden"
            >
              <LogIn className="h-5 w-5" />
              Logout
            </button>
          </NavLink>
          {user.isOwner && (
            <Dropdown className="">
              <DropdownTrigger>
                <Button className="md:hidden" variant="outline">
                  <Menu />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {ownerNavItems.map((item, idx) => (
                  <DropdownItem key={idx}>
                    <NavLink
                      to={item.to}
                      onClick={item.onClick}
                      className={({ isActive }) =>
                        `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition 
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-indigo-50"
                }`
                      }
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </NavLink>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
          {!user.isOwner && (
            <Dropdown className="">
              <DropdownTrigger>
                <Button className="md:hidden" variant="outline">
                  <Menu />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {tenantNavItems.map((item, idx) => (
                  <DropdownItem key={idx}>
                    <NavLink
                      to={item.to}
                      onClick={item.onClick}
                      className={({ isActive }) =>
                        `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition 
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-indigo-50"
                }`
                      }
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </NavLink>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      )}
      {/* {user.rentDue !== 0 && (
        <div className="">
          <NavLink to={"/"}>
            <button
              onClick={handleClick}
              variant="outline"
              className="md:flex items-center gap-2 font-semibold hidden"
            >
              <LogIn className="h-5 w-5" />
              Logout
            </button>
          </NavLink>
          <Dropdown className="">
            <DropdownTrigger>
              <Button className="md:hidden" variant="outline">
                <Menu />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {navItems.map((item, idx) => (
                <DropdownItem key={idx}>
                  <NavLink
                    to={item.to}
                    onClick={item.onClick}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition 
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-indigo-50"
                }`
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      )} */}
    </header>
  );
}
