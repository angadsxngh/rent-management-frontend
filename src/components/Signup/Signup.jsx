import React from "react";
import { Tabs, Tab, Link, Card, CardBody, Button, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function SignupPage() {
  const [selected, setSelected] = React.useState("owner");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[30%]"
      >
        <div className="text-4xl font-extrabold text-indigo-700 mb-4 flex justify-center">
          <h2>Create Your Account</h2>
        </div>

        <div className="flex flex-col w-full">
          <Card className="max-w-full h-[600px] px-[5%]">
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
                    <Input isRequired label="Full Name" placeholder="Enter your name" type="text" />
                    <Input isRequired label="Email" placeholder="example@email.com" type="email" />
                    <Input isRequired label="Phone" placeholder="+91 99999-99999" type="email" />
                    <Input isRequired label="Password" placeholder="Create a password" type="password" />
                    <Input isRequired label="Confirm Password" placeholder="Confirm your password" type="password" />
                    <p className="text-center text-small cursor-pointer mt-6">
                      Already have an account?{" "}
                      <NavLink to={"/login"} size="sm" className="hover:underline text-blue-600">
                        Sign up
                      </NavLink>
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button className="w-[40%]" color="primary">
                        <LogIn className="h-5 w-5" />
                        Sign Up
                      </Button>
                    </div>
                  </form>
                </Tab>

                <Tab key="tenant" title="Tenant">
                <form className="flex flex-col gap-4 mt-6">
                    <Input isRequired label="Full Name" placeholder="Enter your name" type="text" />
                    <Input isRequired label="Email" placeholder="example@email.com" type="email" />
                    <Input isRequired label="Phone" placeholder="+91 99999-99999" type="email" />
                    <Input isRequired label="Password" placeholder="Create a password" type="password" />
                    <Input isRequired label="Confirm Password" placeholder="Confirm your password" type="password" />
                    <p className="text-center text-small cursor-pointer mt-6">
                      Already have an account?{" "}
                      <NavLink to={"/login"} size="sm" className="hover:underline text-blue-600">
                        Sign up
                      </NavLink>
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button className="w-[40%]" color="primary">
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
