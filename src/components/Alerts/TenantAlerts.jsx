import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";
import { CalendarClock, IndianRupee } from "lucide-react";
import Spinner from "../Spinner/Spinner"; // added Spinner

export default function Alerts() {
  const { alerts, fetchAlerts } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchAlerts();
      setLoading(false);
    };
    load();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const formatDateTime = (datetime) =>
    new Date(datetime).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <main className="flex-1 md:p-5 py-5 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
          Alerts & Requests
        </h1>
        <p className="text-gray-600 text-lg">
          View updates and stay up to date!
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : alerts.length === 0 ? (
        <div className="text-gray-600 text-md">No alerts available</div>
      ) : (
        <div className="flex flex-col gap-4">
          {alerts.map((req) => (
            <Card key={req.id} className="shadow-lg rounded-2xl">
              <CardBody className="py-4 px-6 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="flex-1 pr-4">
                    <p className="text-indigo-700 font-semibold text-lg">
                      {req.owner.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {req.property.address}, {req.property.city}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {req.property.country}
                    </p>
                  </div>
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <img
                      src={req.property.imageUrl}
                      alt="Property"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Body */}
                {req.type === "request" ? (
                  <div>
                    <p className="text-sm text-gray-600">
                      Your request to join this property has been{" "}
                      <span className="font-medium">{req.status}</span>.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <IndianRupee className="w-4 h-4 text-indigo-500" />
                      Payment requested:{" "}
                      <span className="font-medium text-indigo-700">
                        ₹{req.amount}
                      </span>
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusStyle(
                      req.status
                    )}`}
                  >
                    {req.status}
                  </span>
                  <div className="flex items-center text-xs text-gray-500 gap-1">
                    <CalendarClock className="w-4 h-4" />
                    {formatDateTime(req.createdAt)}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
