import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, Home } from "lucide-react";
import { useUser } from "../../context/UserContext";
import Spinner from "../Spinner/Spinner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { NavLink } from "react-router-dom";

export default function Ownerproperty() {
  const { user, properties, refreshProperties } = useUser();
  const [property, setproperty] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAll, setShowAll] = useState(true);
  const [showActive, setShowActive] = useState(true);
  const [showInactive, setShowInactive] = useState(true);

  useEffect(() => {
    if (user) refreshProperties();
  }, [user]);

  useEffect(() => {
    setproperty(properties || []);
    setLoading(false);
  }, [properties]);

  const activeproperty = property.filter((p) => p.tenantId?.length > 0);
  const inactiveproperty = property.filter((p) => !p.tenantId);

  const Section = ({ title, visible, toggle, data }) => (
    <section className="space-y-2 px-2 sm:px-4">
      <button
        onClick={toggle}
        className="flex items-center text-xl font-bold text-indigo-700 hover:opacity-80 transition"
      >
        {visible ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
        {title}
      </button>
      {visible && (
        <Carousel className="w-full max-w-sm md:max-w-5xl">
          <CarouselContent className="-ml-1 max-w-[330px] md:max-w-lg lg:max-w-5xl">
            {data.length > 0 ? (
              data.map((property, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <NavLink to="/card" state={property}>
                      <Card className="rounded-2xl max-w-[330px] shadow hover:shadow-lg transition cursor-pointer">
                        <img
                          src={property.imageUrl}
                          alt="Property"
                          className="w-full h-40 object-cover"
                        />
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-bold text-indigo-700 truncate">
                              {property.address}, {property.city}
                            </h3>
                            <Home className="text-indigo-600 h-5 w-5" />
                          </div>
                          <div className="flex justify-between text-sm text-gray-700 mb-2">
                            <p>Rent: ₹{property.rentAmount.toLocaleString()}</p>
                            <p>{property.size} sqft</p>
                          </div>
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
                          <div className="text-xs text-gray-400">
                            Located in: {property.country}
                            <br />
                            Listed on:{" "}
                            {new Date(property.createdAt).toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    </NavLink>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <p className="text-sm text-gray-500 p-4">No properties found in this section.</p>
            )}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline" />
          <CarouselNext className="hidden md:inline" />
        </Carousel>
      )}
    </section>
  );

  return (
    <main className="py-10 flex-1 md:p-5 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
          Your property
        </h1>
        <p className="text-gray-600 text-lg">
          View and manage your listed property
        </p>
      </motion.div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-10">
          <Section
            title="All Properties"
            visible={showAll}
            toggle={() => setShowAll((prev) => !prev)}
            data={property}
          />
          <Section
            title="Active Properties"
            visible={showActive}
            toggle={() => setShowActive((prev) => !prev)}
            data={activeproperty}
          />
          <Section
            title="Inactive Properties"
            visible={showInactive}
            toggle={() => setShowInactive((prev) => !prev)}
            data={inactiveproperty}
          />
        </div>
      )}
    </main>
  );
}
