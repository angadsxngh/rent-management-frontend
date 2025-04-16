import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, Button, Input } from "@heroui/react";
import { color, motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { addToast } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate()

  const { setUser, refreshUser } = useUser();

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [selected, setSelected] = useState("owner");

  const handleOwnerClick = async (e) => {
    e.preventDefault;

    try {
      const res = await fetch("/api/v1/owners/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(res)

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          refreshUser()
          navigate('/owner-dashboard')
          addToast({
            title: "login successfull",
            color: "success",
            icon: (
              <svg height={24} viewBox="0 0 24 24" width={24}>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeWidth={1.5}
                >
                  <path
                    d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                    data-name="Stroke 1"
                  />
                  <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
                </g>
              </svg>
            ),
          })
        }
      } else{
        addToast({
          title: "Invalid email or password",
          color: "danger",
        })
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: "An error occured",
        color: "danger",
      })
    }
  };

  const handleTenantClick = async (e) => {
    e.preventDefault;

    try {
      const res = await fetch("/api/v1/tenants/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(res)
      if (res.ok) {
        const data = await res.json();
        console.log(data)
        console.log(data.user)
        if (data) {
          setUser(data);
          refreshUser()
          navigate('/tenant-dashboard')
          addToast({
            title: "login successfull",
            color: "success",
            icon: (
              <svg height={24} viewBox="0 0 24 24" width={24}>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeWidth={1.5}
                >
                  <path
                    d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                    data-name="Stroke 1"
                  />
                  <path d="M11.837 11.174a4.372 4.372 0 10-.031 0z" data-name="Stroke 3" />
                </g>
              </svg>
            ),
          })
        }
      } else{
        addToast({
          title: "Invalid email or password",
          color: "danger",
        })
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: "An error occured",
        color: "danger",
      })
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md md:max-w-xl"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-6 text-center">
          Sign into RentEase
        </h2>
        <Card className="w-full">
          <CardBody className="overflow-hidden px-6 py-8">
            <Tabs
              fullWidth
              aria-label="Tabs form"
              selectedKey={selected}
              size="md"
              onSelectionChange={setSelected}
            >
              <Tab key="owner" title="Owner">
                <form className="flex flex-col gap-4 mt-6">
                  <Input
                    onChange={handleChange}
                    isRequired
                    name="phone"
                    label="Phone"
                    type="text"
                  />
                  <Input
                    onChange={handleChange}
                    name="password"
                    isRequired
                    label="Password"
                    type="password"
                  />
                  <p className="text-center text-sm mt-6">
                    Need to create an account?{" "}
                    <NavLink
                      to="/signup"
                      className="hover:underline text-blue-600"
                    >
                      Sign up
                    </NavLink>
                  </p>
                  <div className="flex justify-center mt-4">
                    <Button
                      onPress={handleOwnerClick}
                      className="w-1/2 md:w-1/3"
                      color="primary"
                    >
                      <LogIn className="h-5 w-5" />
                      Login
                    </Button>
                  </div>
                </form>
              </Tab>

              <Tab key="sign-up" title="Tenant">
                <form className="flex flex-col gap-4 mt-6">
                  <Input
                    onChange={handleChange}
                    isRequired
                    label="Phone"
                    name="phone"
                    type="text"
                  />
                  <Input
                    onChange={handleChange}
                    isRequired
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <p className="text-center text-sm mt-6">
                    Need to create an account?{" "}
                    <NavLink
                      to="/signup"
                      className="hover:underline text-blue-600"
                    >
                      Sign up
                    </NavLink>
                  </p>
                  <div className="flex justify-center mt-4">
                    <Button onPress={handleTenantClick} className="w-1/2 md:w-1/3" color="primary">
                      <LogIn className="h-5 w-5" />
                      Login
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </motion.div>
    </main>
  );
}
