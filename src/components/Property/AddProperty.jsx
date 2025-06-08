import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
  addToast
} from "@heroui/react";
import { Plus, Trash2 } from "lucide-react";
import { Country, State, City } from "country-state-city";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const { user } = useUser();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const types = [
    { label: "Agricultural", key: "AGR" },
    { label: "Commercial", key: "COM" },
    { label: "Residential", key: "RES" },
  ];

  const allCountries = Country.getAllCountries();
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  const [countryQuery, setCountryQuery] = useState("");
  const [stateQuery, setStateQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    rentAmount: "",
    size: "",
    imageFile: null,
    previewUrl: "",
    city: "",
    state: "",
    country: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      country: country?.name || "",
    }));
  }, [country]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      state: state?.name || "",
    }));
  }, [state]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      city: city?.name || "",
    }));
  }, [city]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rentAmount" || name === "size" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = new FormData();
      payload.append("address", formData.address);
      payload.append("rentAmount", formData.rentAmount);
      payload.append("size", formData.size);
      payload.append("city", city?.name || "");
      payload.append("state", state?.name || "");
      payload.append("country", country?.name || "");
      payload.append("ownerId", user.id);
      payload.append("type", formData.type || "");
      if (formData.imageFile) {
        payload.append("imageUrl", formData.imageFile);
      }
      console.log(payload);

      const response = await fetch(`${BASE_URL}/api/v1/owners/add-property`, {
        method: "POST",
        credentials: "include",
        body: payload,
      });

      if (!response.ok) throw new Error("Failed to add property.");
      addToast({
        title: "Property added!",
        color: "success"
      })
      navigate("/owner-dashboard");
    } catch (err) {
      addToast({
        title: "An error occured",
        description: `${err.message}`,
        color:"danger"
      })
    } finally {
      setLoading(false);
    }
  };

  const filterItems = (items, query, key = "name") =>
    items.filter((item) =>
      item[key].toLowerCase().includes(query.toLowerCase())
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 py-32 to-indigo-100  px-6 flex justify-center">
      <Card className="w-full max-w-3xl shadow-xl rounded-2xl">
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-6 flex items-center">
            <Plus className="w-5 h-5 mr-2" /> Add New Property
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Address */}
            <Input
              id="Address"
              name="address"
              type="text"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            {/* Country */}
            <Autocomplete
              label="Country"
              inputValue={countryQuery}
              value={countryQuery}
              onChange={handleChange}
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

            {/* State */}
            <Autocomplete
              label="State"
              inputValue={stateQuery}
              value={stateQuery || ""}
              onInputChange={setStateQuery}
              onChange={handleChange}
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

            {/* City */}
            <Autocomplete
              label="City"
              inputValue={cityQuery}
              onInputChange={setCityQuery}
              value={formData.city}
              onChange={handleChange}
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

            {/* Rent Amount */}
            <div className="relative">
              <Input
                id="rentAmount"
                name="rentAmount"
                type="number"
                value={formData.rentAmount}
                onChange={handleChange}
                min={0}
                label="Rent Amount"
                required
                className="pr-10"
              />
              <span className="absolute inset-y-0 right-3 flex items-center font-semibold text-gray-500 pointer-events-none">
                ₹
              </span>
            </div>

            {/* Plot Size */}
            <div className="relative">
              <Input
                id="size"
                name="size"
                type="number"
                value={formData.size}
                onChange={handleChange}
                label="Plot size"
                required
                className="pr-14"
              />
              <span className="absolute inset-y-0 right-3 flex items-center font-semibold text-gray-500 pointer-events-none">
                sq ft
              </span>
            </div>

            <Autocomplete
              className="max-w-xs"
              defaultItems={types}
              label="Type"
              required
              name="type"
              selectedKey={types.find((t) => t.label === formData.type)?.key}
              onSelectionChange={(key) => {
                const selected = types.find((t) => t.key === key);
                if (selected) {
                  setFormData((prev) => ({ ...prev, type: selected.label }));
                }
              }}
            >
              {(type) => (
                <AutocompleteItem key={type.key}>{type.label}</AutocompleteItem>
              )}
            </Autocomplete>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setFormData((prev) => ({
                      ...prev,
                      imageFile: file,
                      previewUrl,
                    }));
                  }
                }}
                required
              />

              {/* Image Preview */}
              {formData.previewUrl && (
                <div className="mt-4 space-y-2">
                  <img
                    src={formData.previewUrl}
                    alt="Preview"
                    className="w-full rounded-lg object-cover max-h-[400px]"
                  />
                  <Button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        imageFile: null,
                        previewUrl: "",
                      }))
                    }
                    className="text-sm text-white bg-red-600 font-semibold hover:underline flex gap-2"
                  >
                    <Trash2 />
                    Remove Image
                  </Button>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="text-red-500 text-sm md:col-span-2">{error}</div>
            )}

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-end">
              <Button
                type="submit"
                variant="solid"
                color="indigo"
                className="bg-indigo-700 text-white font-semibold"
                disabled={loading}
              >
                {loading ? "Saving..." : "Add Property"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
