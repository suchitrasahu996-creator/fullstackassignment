import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBalance(response.data.data.balance);
      } catch (error) {
        console.error("Error fetching balance", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">

      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">

        <h2 className="text-xl font-semibold mb-4">
          Account Balance
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <p className="text-3xl font-bold text-green-600">
            ₹{balance}
          </p>
        )}

      </div>

      <div className="flex gap-4 mt-8">

        <a
          href="/send-money"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Send Money
        </a>

        <a
          href="/statement"
          className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900"
        >
          View Statement
        </a>

      </div>

    </div>
  );
}