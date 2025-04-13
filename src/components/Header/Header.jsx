import React from "react";
import { Button } from "@heroui/react";
import { LogIn } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full fixed z-50 px-6 py-4 bg-white shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-indigo-700">RentEase</h1>
      <nav className="space-x-6 hidden md:block">
        <a href="#features" className="text-gray-700 hover:text-indigo-600 font-medium">Features</a>
        <a href="#reviews" className="text-gray-700 hover:text-indigo-600 font-medium">Reviews</a>
        <a href="#contact" className="text-gray-700 hover:text-indigo-600 font-medium">Contact</a>
      </nav>
      <NavLink to={'/login'}>
        <Button variant="outline" className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
              Login
        </Button>
      </NavLink>
    </header>
  );
}
