import React, { useState } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  DollarSign,
  Star,
  BookOpen,
  Plus,
} from "lucide-react";
import OwnerProperties from "../Property/Properties";
import { useUser } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import PropertyDetailCard from "../Property/PropertyCard";

export default function OwnerDashboard() {
  const { user, properties } = useUser();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedProperty =
    selectedIndex !== null ? properties[selectedIndex] : null;

  const activePropertiesCount = properties.filter(
    (p) => p.tenant === null
  ).length;
  const stats = [
    {
      title: "Rent Due This Month",
      value: "₹1,20,000",
      icon: <DollarSign className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Properties Listed",
      value: properties.length,
      icon: <Building2 className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Active Properties",
      value: activePropertiesCount,
      icon: <Home className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Owner Rating",
      value: "4.8 / 5",
      icon: <Star className="h-6 w-6 text-yellow-500" />,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-32 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
          Owner Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Your property performance at a glance
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="w-full max-w-screen-xl grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((item, idx) => (
          <Card key={idx} className="shadow-lg rounded-2xl">
            <CardBody className="p-6 items-center space-x-4">
              <div className="flex flex-col items-center justify-between">
                {item.icon}
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-xl font-bold text-indigo-800">
                  {item.value}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Passbook + Add Property */}
      <div className="w-full max-w-screen-xl mb-16 flex flex-col md:flex-row gap-6">
        <Card className="shadow-md rounded-2xl w-full md:w-[70%]">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-indigo-700 flex items-center">
                <BookOpen className="mr-2 h-5 w-5" /> Passbook
              </div>
              <Button variant="outline" size="sm" className="text-sm">
                View Full Statement
              </Button>
            </div>
            <p className="text-gray-600 text-sm">
              Track all rental transactions, income summaries, and payment
              histories from one place.
            </p>
          </CardBody>
        </Card>

        <Card className="shadow-md rounded-2xl w-full md:w-[30%]">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-indigo-700 flex items-center">
                <Plus className="mr-2 h-5 w-5" /> Add Property
              </div>
              <NavLink to={'/add-property'}>
                <Button variant="outline" size="sm" className="text-sm">
                  Add New
                </Button>
              </NavLink>
            </div>
            <p className="text-gray-600 text-sm">
              Add new rental listings and manage your portfolio seamlessly.
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Property Listings */}
      <div className="w-full max-w-screen-2xl">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center md:text-left w-full">
          Property Listings
        </h2>
        <NavLink to={"/card"}>
          <OwnerProperties />
        </NavLink>
      </div>
    </main>
  );
}
