import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, PlusCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Spinner from "../Spinner/Spinner";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Passbook() {
  const { user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTransactions, setShowTransactions] = useState(true);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/owners/fetch-transactions`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to load transactions", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchTransactions();
  }, [user]);

  const handleNewPayment = () => {
    navigate("/record-payment");
  };

  return (
    <main className="py-10 flex-1 md:p-5 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
          Passbook
        </h1>
        <p className="text-gray-600 text-lg">
          Track all transactions and payment history
        </p>
        <button
          onClick={handleNewPayment}
          className="mt-4 text-sm inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          <PlusCircle className="mr-2" size={20} />
          Record New Payment
        </button>
      </motion.div>

      {loading ? (
        <Spinner />
      ) : (
        <section className=" sm:px-6">
          {transactions.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Amount (₹)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Property
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Mode
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {transactions.map((tx, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                          {new Date(tx.date).toLocaleDateString()}
                        </td>
                        <td
                          className={`whitespace-nowrap px-4 py-3 text-sm font-mono ${
                            tx.amount >= 0 ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          ₹{tx.amount.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                          {tx.address}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                          {tx.mode}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 italic max-w-xs truncate">
                          {tx.note || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="space-y-4 sm:hidden">
                {transactions.map((tx, idx) => (
                  <Card key={idx} className="p-4 shadow-sm border rounded-xl">
                    <CardContent className="space-y-1">
                      <p className="text-xs text-gray-500">
                        {new Date(tx.date).toLocaleDateString()}
                      </p>
                      <p
                        className={`text-base font-semibold ${
                          tx.amount >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        ₹{tx.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Property:</span>{" "}
                        {tx.address}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Mode:</span> {tx.mode}
                      </p>
                      {tx.note && (
                        <p className="text-sm italic text-gray-600">
                          <span className="font-medium">Note:</span> {tx.note}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500 p-4">No transactions yet.</p>
          )}
        </section>
      )}
    </main>
  );
}
