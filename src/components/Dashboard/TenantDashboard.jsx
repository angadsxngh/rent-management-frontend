import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { motion } from "framer-motion";
import {
  Home,
  DollarSign,
  CalendarCheck,
  BookOpen,
  Plus,
  Search,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function TenantDashboard() {
  const { rentals, fetchRentals } = useUser();
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    fetchRentals();
    const rentAmount = rentals.reduce((sum, p) => sum + (p.balance || 0), 0);
    setAmount(rentAmount);
  }, [rentals]);

  const stats = [
    {
      title: "Rent Due",
      value: amount.toLocaleString("en-US"),
      icon: <DollarSign className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Next Due Date",
      value: "5th May 2025",
      icon: <CalendarCheck className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Current Property",
      value:
        rentals.length === 0
          ? "No rentals"
          : rentals.length === 1
          ? rentals[0].address
          : `${rentals[0].address} + ${rentals.length - 1} more`,
      icon: <Home className="h-6 w-6 text-green-600" />,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
          Tenant Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Stay on top of your rent and lease details
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-10">
        {stats.map((item, idx) => (
          <Card key={idx} className="shadow-lg rounded-2xl">
            <CardBody className="p-6 flex flex-col items-center text-center">
              {item.icon}
              <p className="text-sm text-gray-500 mt-2">{item.title}</p>
              <p className="text-xl font-bold text-indigo-800">{item.value}</p>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card className="shadow-md rounded-2xl col-span-2">
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

        <Card className="shadow-md rounded-2xl col-span-1">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-indigo-700 flex items-center">
                <Search className="mr-2 h-5 w-5" /> Find Property
              </div>
              <NavLink to={"/find-property"}>
                <Button variant="outline" size="sm" className="text-sm">
                  Find Now
                </Button>
              </NavLink>
            </div>
            <p className="text-gray-600 text-sm">
              Find new properties that suit you the best.
            </p>
          </CardBody>
        </Card>
      </div>
      {rentals.length > 0 && (
        <div className="mt-16 mb-16">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            Your Rented Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rentals.map((property) => (
              <Card
                key={property.id}
                className="rounded-xl shadow hover:shadow-md transition"
              >
                <CardBody className="p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <img
                      src={property.imageUrl}
                      alt={property.address}
                      className="h-20 w-28 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-700">
                        {property.address}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {property.city}, {property.state}, {property.country}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Rent: ₹{property.rentAmount.toLocaleString()}
                  </p>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      {rentals.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            Lease Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-xl shadow hover:shadow-md transition">
              <CardBody className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-indigo-700">
                  Lease Agreement
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Duration: Jan 2024 – Dec 2024
                </p>
                <Button size="sm" variant="outline">
                  View Lease
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
