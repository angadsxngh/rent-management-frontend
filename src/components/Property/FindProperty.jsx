import React, { useState, useEffect } from "react";
import { Button, Input, Autocomplete, AutocompleteItem } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Country, State, City } from "country-state-city";

export default function FindProperty() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [hasSearched, setHasSearched] = useState(false);

  const allCountries = Country.getAllCountries();
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  const [countryQuery, setCountryQuery] = useState("");
  const [stateQuery, setStateQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");

  const handleClick = (property) => {
    navigate("/property", { state: property });
  };

  // Update states when country changes
  useEffect(() => {
    if (country?.isoCode) {
      const states = State.getStatesOfCountry(country.isoCode);
      setAllStates(states);
      setState(null);
      setAllCities([]);
      setCity(null);
    }
  }, [country]);

  // Update cities when state changes
  useEffect(() => {
    if (state?.isoCode && country?.isoCode) {
      const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
      setAllCities(cities);
      setCity(null);
    }
  }, [state, country]);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const filterItems = (items, query, key = "name") =>
    items.filter((item) =>
      item[key].toLowerCase().includes(query.toLowerCase())
    );

  const handleSearch = async () => {
    if (!city || !state || !country) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/owners/find-property/${city.name}?state=${state.name}&country=${country.name}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setProperties(data || []);
      }
    } catch (err) {
      console.error("Error fetching properties", err);
    }

    setLoading(false);
  };

  return (
    <div className="py-28 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Find Properties by Location
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Autocomplete
            label="Country"
            inputValue={countryQuery}
            onInputChange={setCountryQuery}
            selectedKey={country?.isoCode}
            onSelectionChange={(key) =>
              setCountry(allCountries.find((c) => c.isoCode === key))
            }
            items={filterItems(allCountries, countryQuery)}
          >
            {(item) => (
              <AutocompleteItem key={item.isoCode}>
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            label="State"
            inputValue={stateQuery}
            value={state?.isoCode || ""}
            onInputChange={setStateQuery}
            selectedKey={state?.isoCode}
            onSelectionChange={(isoCode) =>
              setState(allStates.find((s) => s.isoCode === isoCode))
            }
            items={filterItems(allStates, stateQuery)}
            isDisabled={!country}
          >
            {(item) => (
              <AutocompleteItem key={item.isoCode}>
                {item.name}
              </AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            label="City"
            inputValue={cityQuery}
            onInputChange={setCityQuery}
            selectedKey={city?.name}
            onSelectionChange={(name) =>
              setCity(allCities.find((c) => c.name === name))
            }
            items={filterItems(allCities, cityQuery, "name")}
            isDisabled={!state}
          >
            {(item) => (
              <AutocompleteItem key={item.name}>{item.name}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        <div className="text-center">
          <Button
            size="sm"
            className="bg-indigo-700 text-white font-semibold px-6 py-2"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
      {/* Property Grid */}
      {properties.length > 0 && (
        <div className="max-w-8xl mx-auto mt-10 px-6">
          <h3 className="text-xl font-bold text-indigo-700 mb-4">
            Properties found:
          </h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {properties.map((property) => (
              //   <NavLink
              //     to={"/property"}
              //     state={property.id}
              //     target="_blank"
              //     rel="noopener noreferrer"
              //   >
              <div
                key={property.id}
                onClick={() =>
                  window.open(
                    `/property/${property.id}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
              >
                <img
                  src={property.imageUrl}
                  alt="Property"
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {property.address}, {property.city}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    ₹{property.rentAmount} • {property.size} sqft
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {property.country}, {property.state}
                  </p>
                </div>
              </div>
              //   </NavLink>
            ))}
          </div>
        </div>
      )}

      {hasSearched && properties.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-10">No properties found.</p>
      )}
    </div>
  );
}
