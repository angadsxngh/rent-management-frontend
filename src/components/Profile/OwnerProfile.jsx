// components/userProfile.jsx
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useUser } from "../../context/UserContext";
import { Home, Mail, Phone, Banknote, Pencil } from "lucide-react";
import { calculateMonthlyPaymentTotals } from "../../utils/calculateMonthlyPaymentsTotals";

export default function OwnerProfile() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [amount, setAmount] = useState(0);
  const { user, properties, refreshProperties } = useUser();
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
  const activeproperty = properties.filter((p) => p.tenantId?.length > 0);
  const [payments, setPayments] = useState([]);
  const [thisMonth, setThisMonth] = useState(0);
  const [lastMonth, setLastMonth] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/owners/fetch-transactions`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        const { thisMonthTotal, lastMonthTotal } = calculateMonthlyPaymentTotals(data);
        setThisMonth(thisMonthTotal);
        setLastMonth(lastMonthTotal);
      } catch (err) {
        console.error("Failed to load transactions", err);
      }
    };

    const totalRent = activeproperty.reduce((sum, p) => sum + (p.balance || 0), 0);
    setAmount(totalRent);
    fetchTransactions();
    refreshProperties();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-28 px-4 space-y-6">
      {/* Profile Header */}
      <Card className="p-4 md:p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={user?.profilePicture || defaultAvatar}
            alt="Profile"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
          />
          <div className="text-center md:text-left flex-1 space-y-1">
            <h2 className="text-xl md:text-2xl font-semibold">{user?.name}</h2>
            <p className="text-sm text-gray-500 flex justify-center md:justify-start items-center gap-2">
              <Home className="w-4 h-4" /> user
            </p>
            <div className="flex flex-col sm:flex-row sm:gap-4 mt-2 text-sm text-gray-600">
              <p className="flex items-center gap-1 justify-center sm:justify-start">
                <Mail className="w-4 h-4" /> {user?.email}
              </p>
              <p className="flex items-center gap-1 justify-center sm:justify-start">
                <Phone className="w-4 h-4" /> {user?.phone}
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:ml-auto">
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          </div>
        </div>
      </Card>

      {/* Account Summary */}
      <Card className="p-4 md:p-6 rounded-2xl shadow-md">
        <h3 className="text-lg md:text-xl font-semibold mb-2">Account Summary</h3>
        <p className="text-sm md:text-base">Joined on: {new Date(user?.createdAt).toDateString()}</p>
        <p className="text-sm md:text-base">Total Properties Listed: {properties?.length || 0}</p>
        <p className="text-sm md:text-base">Total Earnings: ₹{amount || 0}</p>
      </Card>

      {/* Property List */}
      <Card className="p-4 md:p-6 rounded-2xl shadow-md">
        <h3 className="text-lg md:text-xl font-semibold mb-4">Owned Properties</h3>
        {user?.properties?.length ? (
          <div className="space-y-3">
            {user.properties.map((property) => (
              <div
                key={property.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-100 rounded-md"
              >
                <div>
                  <p className="font-medium">{property.name}</p>
                  <p className="text-sm text-gray-500">{property.location}</p>
                </div>
                <div className="text-left sm:text-right mt-2 sm:mt-0">
                  <p className="text-sm">₹{property.rent}/mo</p>
                  <p className="text-xs text-gray-500">
                    {property.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No properties listed yet.</p>
        )}
      </Card>

      {/* Earnings Summary */}
      <Card className="p-4 md:p-6 rounded-2xl shadow-md">
        <h3 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-2">
          <Banknote className="w-5 h-5" /> Earnings Overview
        </h3>
        <p className="text-sm md:text-base">This Month: ₹{thisMonth || 0}</p>
        <p className="text-sm md:text-base">Last Month: ₹{lastMonth || 0}</p>
      </Card>
    </div>
  );
}
