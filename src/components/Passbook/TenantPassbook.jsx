import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Spinner from "../Spinner/Spinner";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function TenantPassbook() {
  const { user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`/api/v1/tenants/fetch-transactions`, {
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

  return (
    <main className="py-10 flex-1 md:p-5 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
          My Passbook
        </h1>
        <p className="text-gray-600 text-lg">
          View all rent payments made and transaction details
        </p>
      </motion.div>

      {loading ? (
        <Spinner />
      ) : (
        <section className="sm:px-6">
          {transactions.length > 0 ? (
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
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
                      Mode
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Property
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Owner
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
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-mono text-green-600">
                        ₹{tx.amount.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                        {tx.mode}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                        {tx.address}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700 max-w-xs truncate">
                        {tx.owner.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 italic max-w-xs truncate">
                        {tx.note || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500 p-4">No transactions yet.</p>
          )}
        </section>
      )}
    </main>
  );
}
