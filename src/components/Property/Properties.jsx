import React, { useEffect, useState } from "react";
import { Card, CardBody, Spinner } from "@heroui/react";
import { Home } from "lucide-react";
import { useUser } from "../../context/UserContext.jsx";
import { NavLink } from "react-router-dom";

export default function OwnerProperties() {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, refreshProperties, properties } = useUser();

  // 🔁 Fetch only once when `user` is ready
  useEffect(() => {
    if (user) {
      refreshProperties();
    }
  }, [user]);

  // 🎯 Update local state when properties from context change
  useEffect(() => {
    setProperty(properties || []);
    console.log(properties)
    setLoading(false);
  }, [properties]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {property.length === 0 ? (
        <p className="text-gray-600">No properties listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {property.map((property, index) => (
            <NavLink to={'/card'} state={property}>
                <Card
              key={property.id}
              property={property}
              className="rounded-2xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={property.imageUrl}
                alt="Property"
                className="w-full h-48 object-cover"
              />

              <CardBody className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-indigo-700 truncate">
                    {property.address}, {property.city}
                  </h3>
                  <Home className="text-indigo-600 h-5 w-5" />
                </div>

                {/* Rent + Size */}
                <div className="flex justify-between text-sm text-gray-700 mb-2">
                  <p>Rent: ₹{property.rentAmount.toLocaleString()}</p>
                  <p>{property.size} sqft</p>
                </div>

                {/* Owner & Tenant */}
                <div className="text-xs text-gray-500 mb-2">
                  Owner:{" "}
                  <span className="font-medium text-indigo-600">
                    {user.name || "N/A"}
                  </span>
                  <br />
                  Type:{" "}
                  <span className="font-medium text-indigo-600">
                    {property.type || "N/A"}
                  </span>
                  <br />
                  Tenant:{" "}
                  <span className="font-medium">
                    {property.tenantName || "Not Rented"}
                  </span>
                </div>

                {/* Country + Created */}
                <div className="text-xs text-gray-400">
                  Located in: {property.country}
                  <br />
                  Listed on: {new Date(property.createdAt).toLocaleDateString()}
                </div>
              </CardBody>
            </Card>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
