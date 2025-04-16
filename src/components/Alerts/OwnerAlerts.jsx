import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Alerts() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const response = await fetch("/api/v1/owners/get-requests", {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const res = await response.json();
      console.log(res);
      setRequests(res || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (res) => {
    await fetch(`/api/v1/owners/accept-request/${res.property.id}?tenantId=${res.tenant.id}`, {
        method: 'POST',
        credentials:'include'
    })
    fetchRequests()
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
  };

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
          Manage join requests from tenants
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-indigo-300 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {requests.map((req) => (
            <Card key={req.id} className="shadow-lg rounded-2xl">
              <CardBody className="py-4 px-6 space-y-4">
                <div className="flex justify-between items-center">
                  {/* Info Section */}
                  <div className="flex-1 pr-4">
                    <p className="text-indigo-700 font-semibold text-lg">
                      {req.tenant.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {req.property.address}, {req.property.city}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {req.property.country}
                    </p>
                  </div>

                  {/* Property Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <img
                      src={req.property.imageUrl}
                      alt="Property"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusStyle(
                      req.status
                    )}`}
                  >
                    {req.status}
                  </span>

                  {/* Action Buttons */}
                  {req.status === "pending" ? (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-100 text-green-700 hover:bg-green-200"
                        onPress={() => handleAccept(req)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-100 text-red-600 hover:bg-red-200"
                        onPress={() => handleReject(req.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">
                      {req.status === "accepted"
                        ? "You accepted this request"
                        : "You rejected this request"}
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
