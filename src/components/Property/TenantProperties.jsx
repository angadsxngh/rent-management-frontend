import React, { useEffect } from "react";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";

export default function TenantProperties() {
  const { rentals, fetchRentals } = useUser();

  useEffect(() => {
    fetchRentals();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
          Your Rented Properties
        </h1>
        <p className="text-gray-600 text-lg">
          Here's a list of all the properties you've rented
        </p>
      </motion.div>

      {rentals.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          You haven't rented any properties yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  Rent: ₹{property.rentAmount.toLocaleString("en-US")}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Lease Period: Jan 2024 – Dec 2024
                </p>
                <button className="text-indigo-600 text-sm font-medium hover:underline">
                  View Lease Details
                </button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
