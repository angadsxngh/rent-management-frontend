// components/TenantProfile.jsx
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useUser } from "../../context/UserContext";
import { Home, Mail, Phone, Pencil } from "lucide-react";

export default function TenantProfile() {
  const { tenant } = useUser(); // assumes tenant object has name, email, phone, rentedProperty, passbook, etc.

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 space-y-6">
      {/* Profile Header */}
      <Card className="p-6 rounded-2xl shadow-lg">
        <div className="flex items-center gap-6">
          <img
            src={tenant?.profilePicture || "/placeholder.jpg"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">{tenant?.name}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Home className="w-4 h-4" /> Tenant
            </p>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <p className="flex items-center gap-1"><Mail className="w-4 h-4" /> {tenant?.email}</p>
              <p className="flex items-center gap-1"><Phone className="w-4 h-4" /> {tenant?.phone}</p>
            </div>
          </div>
          <div className="ml-auto">
            <Button variant="outline" size="sm"><Pencil className="w-4 h-4 mr-2" /> Edit Profile</Button>
          </div>
        </div>
      </Card>

      {/* Details Section */}
      <Card className="p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-2">Account Details</h3>
        <p>Joined on: {new Date(tenant?.createdAt).toDateString()}</p>
        <p>Currently Renting: {tenant?.rentedProperty?.name || "Not renting a property currently"}</p>
      </Card>

      {/* Passbook Section */}
      <Card className="p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">Rent Passbook</h3>
        {tenant?.passbook?.length ? (
          <div className="space-y-3">
            {tenant.passbook.map((entry, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-md"
              >
                <span className="font-medium">{entry.month}</span>
                <span className={entry.status === "Paid" ? "text-green-600" : "text-red-600"}>
                  {entry.status}
                </span>
                <span>₹{entry.amount}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No payment history available.</p>
        )}
      </Card>
    </div>
  );
}
