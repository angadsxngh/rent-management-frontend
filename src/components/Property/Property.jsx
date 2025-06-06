import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate, NavLink } from "react-router-dom";
import { Button } from "@heroui/react";
import { Trash2, LoaderCircle, Plus, Check } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { addToast } from "@heroui/react";

export default function Property() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [property, setProperty] = useState(location.state || null);
  const [loading, setLoading] = useState(!property);
  const [requestSent, setRequestSent] = useState(false);

  const handleAdd = async () => {
    const response = await fetch(`/api/v1/tenants/create-request/${property.id}`, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      const res = await response.json();
      addToast({
        title: "Request sent successfully",
        color: "success",
      });
      setRequestSent(true);
    }
  };

  useEffect(() => {
    if (id && !property) {
      fetch(`/api/v1/tenants/property/${id}`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setProperty(data);
          setRequestSent(data.requestSent); 
        })
        .catch((err) => console.error("Error fetching property", err))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <LoaderCircle className="w-12 h-12 text-indigo-600 animate-spin" />
        <p className="mt-4 text-sm text-indigo-700 font-medium">
          Loading property...
        </p>
      </div>
    );
  }

  if (!property) {
    return (
      <p className="text-center mt-20 text-gray-600">
        Property not found or no state passed.
      </p>
    );
  }

  return (
    <div className="py-32 sm:py-28 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-700">
              {property.address}, {property.city}
            </h2>
            {user.id === property.ownerId && (
              <button onClick={() => {}} className="ml-4">
                <Trash2 className="text-red-600 hover:text-black w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>

          <div className="w-full h-60 sm:h-72 rounded-xl overflow-hidden mb-6">
            <img
              src={property.imageUrl}
              alt="Property"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 sm:gap-0">
            <div>
              <p className="text-gray-600 text-sm sm:text-base">
                Rent: ₹{property.rentAmount} • {property.size} sqft
              </p>
              <p className="text-gray-500 text-sm sm:text-base mt-1">
                Country: {property.country}
                <br />
                Listed on:{" "}
                {new Date(property.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                <br />
                Tenant: {property.tenant?.name || "Not Rented"}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2">
              <Button
                onPress={handleAdd}
                variant="outline"
                size="sm"
                disabled={requestSent}
                className={`text-sm font-semibold flex gap-2 items-center ${
                  requestSent
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-indigo-700 text-white"
                }`}
              >
                {/* <Plus className="w-4 h-4" />
                {requestSent ? "Request Sent" : "Rent Property"} */}
                {!requestSent ? <>
                    <Plus className="w-4 h-4"/>
                    Rent Property
                </> : <>
                  <Check className="w-4 h-4"/>
                  Request Sent
                </>}
              </Button>

              {requestSent && (
                <Button
                  onPress={() => window.close()}
                  variant="outline"
                  size="sm"
                  className="text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Close Window
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

