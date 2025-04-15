import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { LogIn } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { addToast } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout, setUser, refreshUser } = useUser();

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(!user)
}, [user])

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
    console.log(1)
    console.log(1)
    await logoutUser();
    console.log(1)
    
    if (logout) {
      await logout();
      console.log(1)
      
      addToast({
        title: "User logged out",
      });
      console.log(1)
      setIsLoggedIn(false)
    }
  };

  return (
    <header className="w-full fixed z-50 px-6 py-6 bg-white shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-700">RentEase</h1>
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
      {!user && (
        <NavLink to={"/login"}>
          <button variant="outline" className="flex items-center gap-2 font-semibold">
            <LogIn className="h-5 w-5" />
            Login
          </button>
        </NavLink>
      )}
      {user && (
        <NavLink to={'/'}>
          <button
            onClick={handleClick}
            variant="outline"
            className="flex items-center gap-2 font-semibold"
          >
            <LogIn className="h-5 w-5" />
            Logout
          </button>
        </NavLink>
      )}
    </header>
  );
}
