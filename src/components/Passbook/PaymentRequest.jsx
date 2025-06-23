import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  addToast,
} from "@heroui/react";
import { useUser } from "../../context/UserContext";
import Spinner from "../Spinner/Spinner";

export default function PaymentRequest() {
  const { user, rentals, fetchRentals } = useUser();
  const [selectedRentalId, setSelectedRentalId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [mode, setMode] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => {
    fetchRentals();
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const rentedProperty = rentals?.find((r) => r.id === selectedRentalId);

  const handleSubmit = async () => {
    if (!rentedProperty) {
      addToast({ title: "Please select a property", color: "danger" });
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      addToast({ title: "Enter a valid amount", color: "danger" });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/api/v1/tenants/create-payment-request/${rentedProperty.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ amount: Number(amount), note, mode }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment failed");

      addToast({ title: "Payment request sent", color: "success" });
      setAmount("");
      setNote("");
      fetchRentals();
    } catch (err) {
      addToast({ title: err.message, color: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
  const res = await fetch("http://localhost:3000/api/v1/tenants/create-order", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: 500,
      receipt: "rent_rcpt_id_001",
    }),
  });

  const data = await res.json();

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: data.amount,
    currency: data.currency,
    name: "RentEase",
    description: "Rent Payment",
    order_id: data.id,
    handler: async function (response) {
      const verify = await fetch("http://localhost:3000/api/v1/tenants/verify-signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });

      const result = await verify.json();
      if (result.success) {
        alert("Payment successful!");
      } else {
        alert("Payment failed!");
      }
    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone,
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


  if (!rentals) {
    return (
      <div className="flex items-center justify-center h-40">
        <Spinner />
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700">
        Settle Up
      </h1>
      <p className="text-gray-600 text-sm sm:text-base">
        Submit a payment for your rented property.
      </p>

      {/* Dropdown to select property */}
      <Card className="shadow rounded-2xl">
        <CardBody className="p-4 sm:p-6 space-y-4">
          <label className="text-sm font-medium">Select Property</label>
          <select
            value={selectedRentalId}
            onChange={(e) => setSelectedRentalId(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">-- Select Property --</option>
            {rentals.map((r) => (
              <option key={r.id} value={r.id}>
                {r.address}, {r.city}
              </option>
            ))}
          </select>
        </CardBody>
      </Card>

      {rentedProperty && (
        <>
          <Card className="shadow rounded-2xl">
            <CardBody className="p-4 sm:p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Property</p>
                <p className="font-medium text-base sm:text-lg">
                  {rentedProperty.address}, {rentedProperty.city}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Outstanding Balance</p>
                <p className="font-semibold text-red-600 text-base sm:text-lg">
                  ₹{rentedProperty.balance?.toLocaleString() || 0}
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow rounded-2xl">
            <CardBody className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Amount (₹)</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Payment Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Note (optional)</label>
                <Textarea
                  placeholder="Write a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2 text-white ">
                    <svg
                      className="h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                      />
                    </svg>
                  </div>
                ) : (
                  <div>
                    <p className="text-white font-semibold">Submit Payment</p>
                  </div>
                )}
              </Button>
            </CardBody>
          </Card>
        </>
      )}
    </main>
  );
}
