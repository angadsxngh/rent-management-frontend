import React from "react";
import { useState } from "react";
import { Tabs, Tab, Link, Card, CardBody, Button, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";

export default function SignupPage() {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const navigate = useNavigate();

  const [selected, setSelected] = React.useState("owner");

  const {user, setUser, refreshUser} = useUser();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleOwnerClick = async() => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/owners/register`, {
        method: 'POST',
        credentials: 'include',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if(res.ok){
        const data = await res.json();
        if(data){
          setUser(data);
          refreshUser()
          navigate('/owner-dashboard')
          addToast({
            title: "sign up successfull",
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
        }  else{
          addToast({
            title: "Invalid email or password",
            color: "danger",
          })
        }  
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: "An error occured",
        color: "danger",
      })
    }
  }

  const handleTenantClick = async() => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/tenants/register`, {
        method: 'POST',
        credentials: 'include',
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if(res.ok){
        const data = await res.json();
        if(data){
          setUser(data);
          refreshUser()
          navigate('/tenant-dashboard')
          addToast({
            title: "sign up successfull",
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
         }  else{
          addToast({
            title: "Invalid email or password",
            color: "danger",
          })
        } 
      }
    } catch (error) {
      console.error(error);
      addToast({
        title: "An error occured",
        color: "danger",
      })
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-16 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full sm:w-[90%] md:w-[50%] lg:w-[30%]"
      >
        <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-700 mb-4 flex justify-center">
          <h2>Create Your Account</h2>
        </div>

        <div className="flex flex-col w-full">
          <Card className="max-w-full h-auto px-4 sm:px-[5%]">
            <CardBody className="overflow-hidden">
              <Tabs
                fullWidth
                aria-label="Tabs form"
                selectedKey={selected}
                size="md"
                onSelectionChange={setSelected}
              >
                <Tab key="owner" title="Owner">
                  <form className="flex flex-col gap-4 mt-6">
                    <Input isRequired onChange={handleChange} label="Full Name" name="name" type="text" />
                    <Input isRequired onChange={handleChange} label="Email" name="email"type="email" />
                    <Input isRequired onChange={handleChange} label="Phone" name="phone"  type="text" />
                    <Input isRequired onChange={handleChange} label="Password" name="password"type="password" />
                    <Input isRequired onChange={handleChange} label="Confirm Password" name="confirmpassword"  type="password" />
                    <p className="text-center text-sm cursor-pointer mt-6">
                      Already have an account?{" "}
                      <NavLink to={"/login"} className="hover:underline text-blue-600">
                        Log in
                      </NavLink>
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onPress={handleOwnerClick} className="w-full sm:w-[40%] bg-indigo-700 font-semibold" color="primary">
                        <LogIn className="h-5 w-5" />
                        Sign Up
                      </Button>
                    </div>
                  </form>
                </Tab>

                <Tab key="tenant" title="Tenant">
                  <form className="flex flex-col gap-4 mt-6">
                    <Input isRequired onChange={handleChange} label="Full Name" name="name" type="text" />
                    <Input isRequired onChange={handleChange} label="Email" name="email"  type="email" />
                    <Input isRequired onChange={handleChange} label="Phone" name="phone" type="text" />
                    <Input isRequired onChange={handleChange} label="Password" name="password"  type="password" />
                    <Input isRequired onChange={handleChange} label="Confirm Password" name="confirmpassword" type="password" />
                    <p className="text-center text-sm cursor-pointer mt-6">
                      Already have an account?{" "}
                      <NavLink to={"/login"} className="hover:underline text-blue-600">
                        Log in
                      </NavLink>
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button onPress={handleTenantClick} className="w-full sm:w-[40%] bg-indigo-700 font-semibold" color="primary">
                        <LogIn className="h-5 w-5" />
                        Sign Up
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </motion.div>
    </main>
  );
}
