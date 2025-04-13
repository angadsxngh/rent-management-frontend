import React from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { Building, Home, LogIn, Wallet, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/login')
    }

    const features = [
        {
            title: "Easy Listings",
            description: "Post, edit, and manage property listings in seconds.",
            icon: <Home className="h-6 w-6 text-indigo-600" />,
        },
        {
            title: "Smart Dashboard",
            description: "Track rents, due dates, and maintenance requests in one place.",
            icon: <Building className="h-6 w-6 text-indigo-600" />,
        },
        {
            title: "Secure Payments",
            description: "Integrated gateway ensures secure and fast transactions.",
            icon: <Wallet className="h-6 w-6 text-indigo-600" />,
        },
    ];

    const testimonials = [
        {
            name: "Riya Patel",
            quote: "RentEase made it so simple to manage my rentals. Highly recommended!",
            rating: 5,
        },
        {
            name: "Arjun Mehra",
            quote: "As a tenant, I love the transparency and how easy it is to pay rent.",
            rating: 4,
        },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 pt-32 pb-32">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
                    Welcome to RentEase
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Simplify your rental experience. Whether you're a tenant or a property owner,
                    RentEase helps you manage listings, payments, and more—all in one place.
                </p>
            </motion.div>

            {/* Cards Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
            >
                {[
                    {
                        icon: <Home className="h-10 w-10 text-indigo-500 mx-auto mb-4" />,
                        title: "Register as Tenant",
                        text: "Find your next home and manage your rent payments seamlessly.",
                        button: "Get Started",
                    },
                    {
                        icon: <Building className="h-10 w-10 text-indigo-500 mx-auto mb-4" />,
                        title: "Register as Owner",
                        text: "List and manage your rental properties, tenants, and income with ease.",
                        button: "Start Listing",
                    },
                    {
                        icon: <Wallet className="h-10 w-10 text-indigo-500 mx-auto mb-4" />,
                        title: "Payment Gateway",
                        text: "Secure in-built payments for rent collection and receipts tracking.",
                        button: "Learn More",
                    },
                ].map((item, i) => (
                    <Card key={i} className="rounded-2xl shadow-lg hover:shadow-xl transition h-full">
                        <CardBody className="p-6 text-center flex flex-col h-full justify-between">
                            {item.icon}
                            <div>
                                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                                <p className="text-sm text-gray-600 mb-4">{item.text}</p>
                            </div>
                            <Button variant="outline" className="w-full mt-auto">
                                {item.button}
                            </Button>
                        </CardBody>
                    </Card>
                ))}
            </motion.div>

            {/* Features Section */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mb-20"
            >
                <h2 className="text-2xl font-extrabold text-center text-indigo-700 mb-10">
                    Why Choose RentEase?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Testimonials Section */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mb-20 bg-indigo-50 rounded-2xl py-10 px-6"
            >
                <h2 className="text-2xl font-extrabold text-center text-indigo-700 mb-8">
                    What Our Users Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center mb-3">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="text-yellow-500 mr-1 h-5 w-5" />
                                ))}
                            </div>
                            <p className="text-gray-700 italic mb-2">"{testimonial.quote}"</p>
                            <p className="text-indigo-700 font-semibold">{testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </motion.section>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-12 text-center"
            >
                <p className="text-xl text-indigo-700 font-bold mb-4">
                    Ready to get started with RentEase?
                </p>
                <NavLink to={"/login"}>
                    <Button className="text-lg px-6 rounded-xl shadow-md bg-indigo-600 hover:bg-indigo-700 text-white">
                        <LogIn onClick={handleClick} className="mr-2 h-5 w-5" /> Sign Up / Log In
                    </Button>
                </NavLink>
            </motion.div>
        </main>
    );
}
