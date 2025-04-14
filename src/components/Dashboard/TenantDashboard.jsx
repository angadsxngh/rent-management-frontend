import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Home, DollarSign, CalendarCheck, BookOpen } from "lucide-react";

export default function TenantDashboard() {
  const stats = [
    {
      title: "Rent Due",
      value: "₹25,000",
      icon: <DollarSign className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Next Due Date",
      value: "5th May 2025",
      icon: <CalendarCheck className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Current Property",
      value: "2BHK - Andheri",
      icon: <Home className="h-6 w-6 text-green-600" />,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-32">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((item, idx) => (
          <Card key={idx} className="shadow-lg rounded-2xl">
            <CardBody className="p-6 flex items-center space-x-4">
              {item.icon}
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-xl font-bold text-indigo-800">{item.value}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="mb-16">
        <Card className="shadow-md rounded-2xl">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-indigo-700 flex items-center">
                <BookOpen className="mr-2 h-5 w-5" /> Rent Passbook
              </div>
              <Button variant="outline" size="sm" className="text-sm">
                View Payment History
              </Button>
            </div>
            <p className="text-gray-600 text-sm">
              View your payment timeline, receipts, and monthly rent details here.
            </p>
          </CardBody>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Lease Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-xl shadow hover:shadow-md transition">
            <CardBody className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-indigo-700">Lease Agreement</h3>
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
    </main>
  );
}
