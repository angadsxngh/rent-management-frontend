import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { Textarea } from "@heroui/react";
import { addToast } from "@heroui/react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function SettleBalance() {
  const { properties, refreshProperties } = useUser();
  const [selectedId, setSelectedId] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("Cash");

  const navigate = useNavigate()

  useEffect(() => {
    refreshProperties();
  }, []);

  useEffect(() => {
    const match = properties.find((p) => p.id === selectedId);
    setSelectedProperty(match || null);
  }, [selectedId, properties]);

  const handleSettle = async () => {
    if (!selectedId || !selectedProperty) {
      addToast({
        title: "select a property first!",
        color: color.toLowerCase(),
      });
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      addToast({
        title: "Please enter a valid amount",
        color: color.toLowerCase(),
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/v1/owners/settle-up/${selectedId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: Number(amount),
          note,
          tenantId: selectedProperty.tenantId,
          mode
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to settle balance");

      addToast({
        title: "Payment recorded successfully",
        color: "success",
      });
      setAmount("");
      setNote("");
      refreshProperties(); 
      navigate('/owner-passbook')

    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-16 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-700">Settle Balance</h1>
      <p className="text-gray-600">
        Select a property and record a tenant's payment.
      </p>

      <div className="space-y-2">
        <label
          htmlFor="property"
          className="block text-sm font-medium text-gray-700"
        >
          Choose Property
        </label>
        <div className="relative rounded-md shadow-sm">
          <select
            id="property"
            className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-base"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">-- Select Property --</option>
            {properties
              .filter((p) => p.tenantId)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.address}, {p.city}
                </option>
              ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {selectedProperty && (
        <>
          <Card className="shadow rounded-2xl">
            <CardBody className="p-4 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Tenant</p>
                <p className="font-medium">
                  {selectedProperty.tenantName || "Not Rented"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Outstanding Balance</p>
                <p className="font-semibold text-red-600">
                  ₹{selectedProperty.balance?.toLocaleString() || 0}
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow rounded-2xl">
            <CardBody className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium">Amount Paid (₹)</label>
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
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Note (optional)</label>
                <Textarea
                  placeholder="Write a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                onClick={handleSettle}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
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
                  "Record Payment"
                )}
              </Button>
            </CardBody>
          </Card>
        </>
      )}
    </main>
  );
}
