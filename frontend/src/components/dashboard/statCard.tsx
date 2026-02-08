import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

export function Stats() {
  const navigate = useNavigate();
  const { username } = useUser();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchBalance() {
    if (!username) return;

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/getBalance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
      });
      const data = await response.json();
      setBalance(Math.round(data.balance));
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBalance();
  }, [username]);

  // Format number with commas for Indian numbering system
  const formatBalance = (num: number | null) => {
    if (num === null) return "—";
    return num.toLocaleString('en-IN');
  };

  const cardClasses = "flex-1 flex flex-col justify-center items-center cursor-pointer bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className={cardClasses}
          onClick={() => navigate('/holdings')}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          <h1 className="font-bold text-5xl lg:text-6xl tracking-tight">
            {isLoading ? (
              <span className="text-gray-300 animate-pulse">₹—</span>
            ) : (
              <>₹{formatBalance(balance)}</>
            )}
          </h1>
          <h2 className="font-semibold text-lg text-[#999999] mt-2">
            Total Balance
          </h2>
        </motion.div>

        <motion.div
          className={cardClasses}
          onClick={() => navigate('/viewMarket')}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          <h1 className="font-bold text-5xl lg:text-6xl tracking-tight">
            ₹143K
          </h1>
          <h2 className="font-semibold text-lg text-[#999999] mt-2">
            Market Value
          </h2>
        </motion.div>

        <motion.div
          className={cardClasses}
          onClick={() => navigate('/holdings')}
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          <h1 className="font-bold text-5xl lg:text-6xl tracking-tight">
            ₹143K
          </h1>
          <h2 className="font-semibold text-lg text-[#999999] mt-2">
            Portfolio
          </h2>
        </motion.div>
      </div>
    </div>
  )
}
