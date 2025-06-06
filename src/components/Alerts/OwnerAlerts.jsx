import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";
import Spinner from "../Spinner/Spinner";

export default function Alerts() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL
  const { requests, fetchRequests } = useUser();
  const [loading, setLoading] = useState(true);
  const [loadingRequestId, setLoadingRequestId] = useState(null);
  const [loadingActionType, setLoadingActionType] = useState(null);

  useEffect(() => {
    const loadRequests = async () => {
      await fetchRequests();
      setLoading(false);
    };
    loadRequests();
  }, []);

  const handleAccept = async (res) => {
    setLoadingRequestId(res.id);
    setLoadingActionType("accept");
    try {
      if (res.type === "request") {
        await fetch(
          `${BASE_URL}/api/v1/owners/accept-request/${res.property.id}?tenantId=${res.tenant.id}&tenantName=${res.tenant.name}`,
          { method: "POST", credentials: "include" }
        );
      } else if (res.type === "paymentRequest") {
        await fetch(
          `${BASE_URL}/api/v1/owners/accept-payment/${res.property.id}?id=${res.id}`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ amount: res.amount }),
          }
        );
      }
    } finally {
      await fetchRequests();
      setLoadingRequestId(null);
      setLoadingActionType(null);
    }
  };

  const handleReject = async (res) => {
    setLoadingRequestId(res.id);
    setLoadingActionType("reject");
    try {
      if (res.type === "request") {
        await fetch(
          `${BASE_URL}/api/v1/owners/delete-request/${res.property.id}?tenantId=${res.tenant.id}&tenantName=${res.tenant.name}`,
          { method: "POST", credentials: "include" }
        );
      } else if (res.type === "paymentRequest") {
        await fetch(`${BASE_URL}/api/v1/owners/reject-payment/${res.id}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ amount: res.amount }),
        });
      }
    } finally {
      await fetchRequests();
      setLoadingRequestId(null);
      setLoadingActionType(null);
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
          <Spinner />
        </div>
      ) : requests.length === 0 ? (
        <div className="text-gray-600 text-md">No requests available</div>
      ) : (
        <div className="flex flex-col gap-4">
          {requests.map((req) => (
            <Card key={req.id} className="shadow-lg rounded-2xl">
              <CardBody className="py-4 px-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <p className="text-indigo-700 font-semibold text-lg">
                      {req.tenant.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {req.property.address}, {req.property.city},{" "}
                      {req.property.country}
                    </p>
                    {req.type === "paymentRequest" && (
                      <p
                        className={`text-sm font-medium mt-2 ${
                          req.status === "accepted"
                            ? "text-green-600"
                            : req.status === "rejected"
                            ? "text-red-600"
                            : "text-rose-600"
                        }`}
                      >
                        💰 Payment Request: ₹{req.amount}
                      </p>
                    )}
                  </div>
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <img
                      src={req.property.imageUrl}
                      alt="Property"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                        req.status == "rejected"
                          ? "bg-red-100 text-red-700"
                          : req.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(req.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>

                  {req.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        disabled={
                          loadingRequestId === req.id &&
                          loadingActionType === "accept"
                        }
                        className="bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-70"
                        onPress={() => handleAccept(req)}
                      >
                        {loadingRequestId === req.id &&
                        loadingActionType === "accept" ? (
                          <Spinner size={4} />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                      </Button>

                      <Button
                        size="sm"
                        disabled={
                          loadingRequestId === req.id &&
                          loadingActionType === "reject"
                        }
                        className="bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-70"
                        onPress={() => handleReject(req)}
                      >
                        {loadingRequestId === req.id &&
                        loadingActionType === "reject" ? (
                          <Spinner size={4} />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                      </Button>
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
