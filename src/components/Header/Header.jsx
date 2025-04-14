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
    setTenant(null);
    localStorage.removeItem("user");
  };

  const handleClick = async (e) => {
    e.preventDefault;
    await logoutUser();

    if (logoutTenant) {
      await logoutTenant;

      addToast({
        title: "User logged out",
      });
    }
  };

  return (
    <header className="w-full fixed z-50 px-6 py-4 bg-white shadow-md flex justify-between items-center">
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
          <Button variant="outline" className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            Login
          </Button>
        </NavLink>
      )}
      {user && (
        <NavLink to={''}>
          <Button
            onPress={handleClick}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogIn className="h-5 w-5" />
            Logout
          </Button>
        </NavLink>
      )}
    </header>
  );
}
