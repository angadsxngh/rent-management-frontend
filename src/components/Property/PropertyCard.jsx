import React from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { Button } from "@heroui/react";
import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useUser } from "../../context/UserContext";

export default function PropertyCard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const property = location.state;

  const handleClick = async () => {
    if (!property.id) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the property at "${property.address}, ${property.city}"?`
    );

    if (!confirmDelete) return;

    console.log("id:", property.id);

    const response = await fetch("/api/v1/owners/delete-property", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ propertyId: property.id }),
    });

    console.log("response", response);

    if (response.ok) {
      navigate("/owner-dashboard");
    }
  };

  if (!property) {
    return (
      <p className="text-center mt-20 text-gray-600">
        Property not found or no state passed.
      </p>
    );
  }

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow hover:shadow-lg transition overflow-hidden rounded-xl ">
        <div className="flex justify-between items-center mb-6">
          {user.rentDue && (
            <NavLink to={"/tenant-dashboard"}>
            <Button
              variant="outline"
              size="sm"
              className="text-sm bg-indigo-700 text-white font-semibold "
            >
              ← Back to Dashboard
            </Button>
          </NavLink>
          )}
          {!user.rentDue && (
            <NavLink to={"/owner-dashboard"}>
            <Button
              variant="outline"
              size="sm"
              className="text-sm bg-indigo-700 text-white font-semibold "
            >
              ← Back to Dashboard
            </Button>
          </NavLink>
          )}

          {user.id === property.ownerId && (
            <NavLink to={"/owner-dashboard"}>
              <button onClick={handleClick}>
                <Trash2 className="text-red-600 hover:text-black" />
              </button>
            </NavLink>
          )}
        </div>
        <img
          src={property.imageUrl}
          alt="Property"
          className="w-full h-72 object-cover rounded-xl mb-6"
        />
        <h2 className="text-2xl font-bold text-indigo-700">
          {property.address}, {property.city}
        </h2>
        <p className="text-gray-600 mt-2">
          Rent: ₹{property.rentAmount.toLocaleString()} • {property.size} sqft
        </p>
        <p className="text-gray-500 mt-1">
          Country: {property.country}
          <br />
          Listed on: {new Date(property.createdAt).toLocaleDateString()}
          <br />
          Tenant: {property.tenant?.name || "Not Rented"}
        </p>
      </div>
    </div>
  );
}
