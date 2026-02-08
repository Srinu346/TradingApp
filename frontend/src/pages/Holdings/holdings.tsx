import { motion, useScroll } from "motion/react";
import { NavBar } from "../../components/dashboard/NavBar";
import { Footer } from "../../components/footer";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Button } from "../../components/blackButton";
import { Input } from "../../components/authPage/input";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/toast";

// Interface for user's stock holdings
interface StockHolding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgprice: number;
}

// Interface for master stock with current price
interface MasterStock {
  symbol: string;
  name: string;
  currentPrice: number;
}

export function Holdings() {
  const navigate = useNavigate();
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [userStocks, setUserStocks] = useState<StockHolding[]>([]);
  const [masterStocks, setMasterStocks] = useState<MasterStock[]>([]);
  const [portfolioHistory, setPortfolioHistory] = useState<{ time: Date, currentValue: number, investedValue: number }[]>([]);

  const addBalance = async () => {
    const amount = depositAmount;
    if (amount === 0) {
      addToast({
        title: "Invalid Amount",
        description: "Please add at least ₹100",
        color: "warning",
      });
      return;
    }

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      addToast({
        title: "Authentication Required",
        description: "Please login first to add balance",
        color: "danger",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/addBalance', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify({ amount: depositAmount, username: username })
      });

      if (response.ok) {
        addToast({
          title: "Deposit Successful",
          description: `₹${depositAmount} has been added to your wallet`,
          color: "success",
        });
        setCurrentBalance(prev => prev + depositAmount);
        setDepositAmount(0);
      } else {
        addToast({
          title: "Deposit Failed",
          description: "Unable to add balance. Please try again.",
          color: "danger",
        });
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: "Network error. Please check your connection.",
        color: "danger",
      });
    }
  }

  const withdrawBalance = async () => {
    const amount = withdrawAmount;
    if (amount === 0) {
      addToast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount",
        color: "warning",
      });
      return;
    }

    if (amount > currentBalance) {
      addToast({
        title: "Insufficient Balance",
        description: "You don't have enough balance to withdraw this amount",
        color: "danger",
      });
      return;
    }

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
      addToast({
        title: "Authentication Required",
        description: "Please login first to withdraw balance",
        color: "danger",
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/withdrawBalance', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify({ amount: withdrawAmount, username: username })
      });

      if (response.ok) {
        addToast({
          title: "Withdrawal Successful",
          description: `₹${withdrawAmount} has been withdrawn from your wallet`,
          color: "success",
        });
        setCurrentBalance(prev => prev - withdrawAmount);
        setWithdrawAmount(0);
      } else {
        addToast({
          title: "Withdrawal Failed",
          description: "Unable to withdraw balance. Please try again.",
          color: "danger",
        });
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: "Network error. Please check your connection.",
        color: "danger",
      });
    }
  }

  // Fetch user's stock holdings
  const fetchHoldings = async () => {
    const username = localStorage.getItem("username");
    if (!username) return;

    try {
      const response = await fetch("http://localhost:3000/api/myHoldings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
      const data = await response.json();
      console.log("Holdings data:", data);
      if (data.stocks) {
        setUserStocks(data.stocks);
      }
    } catch (err) {
      console.error("Error fetching holdings:", err);
    }
  };

  // Fetch all stocks for current prices
  const fetchMasterStocks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/allStocks");
      const data = await response.json();
      setMasterStocks(data);
    } catch (err) {
      console.error("Error fetching master stocks:", err);
    }
  };

  // Get current price for a stock
  const getCurrentPrice = (symbol: string): number => {
    const stock = masterStocks.find((s) => s.symbol === symbol);
    return stock?.currentPrice || 0;
  };

  // Calculate total current value
  const calculateCurrentValue = (): number => {
    return userStocks.reduce((total, stock) => {
      return total + (stock.quantity * getCurrentPrice(stock.symbol));
    }, 0);
  };

  // Calculate total invested value
  const calculateInvestedValue = (): number => {
    return userStocks.reduce((total, stock) => {
      return total + (stock.quantity * stock.avgprice);
    }, 0);
  };

  const handleStockClick = (symbol: string) => {
    navigate(`/viewStock/${symbol}`);
  };

  useEffect(() => {
    const username = localStorage.getItem("username");

    async function fetchBalance() {
      try {
        const response = await fetch("http://localhost:3000/api/getBalance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username }),
        });

        if (!response.ok) {
          console.error("Failed to fetch balance");
          return;
        }

        const data = await response.json();
        setCurrentBalance(data.balance);
      } catch (error) {
        console.error("Error fetching balance", error);
      }
    }

    if (username) {
      fetchBalance();
      fetchHoldings();
      fetchMasterStocks();
    }

    // Poll for price updates every 5 seconds
    const interval = setInterval(() => {
      fetchMasterStocks();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update portfolio history every time data changes (keeps last 30 mins)
  useEffect(() => {
    if (userStocks.length === 0 || masterStocks.length === 0) return;

    const currentValue = calculateCurrentValue();
    const investedValue = calculateInvestedValue();
    const now = new Date();
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

    setPortfolioHistory(prev => {
      // Filter out entries older than 30 minutes
      const filtered = prev.filter(entry => entry.time > thirtyMinutesAgo);
      // Add new entry
      return [...filtered, { time: now, currentValue, investedValue }];
    });
  }, [masterStocks]);

  useEffect(() => {
    if (!chartContainer.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Use portfolio history for chart data
    const labels = portfolioHistory.map(entry =>
      entry.time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    );
    const currentValues = portfolioHistory.map(entry => entry.currentValue);
    const investedValues = portfolioHistory.map(entry => entry.investedValue);

    // Get latest values for color determination
    const latestCurrent = currentValues[currentValues.length - 1] || 0;
    const latestInvested = investedValues[investedValues.length - 1] || 0;
    const isProfit = latestCurrent >= latestInvested;

    chartInstance.current = new Chart(chartContainer.current, {
      type: "line",
      data: {
        labels: labels.length > 0 ? labels : ['--'],
        datasets: [
          {
            label: "Current Value",
            data: currentValues.length > 0 ? currentValues : [0],
            borderColor: isProfit ? "#22c55e" : "#ef4444",
            backgroundColor: isProfit ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
            pointBackgroundColor: isProfit ? "#22c55e" : "#ef4444",
            pointBorderColor: "#fff",
            pointBorderWidth: 1,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
          {
            label: "Invested Value",
            data: investedValues.length > 0 ? investedValues : [0],
            borderColor: "#6b7280",
            backgroundColor: "transparent",
            borderWidth: 2,
            borderDash: [5, 5],
            tension: 0,
            fill: false,
            pointRadius: 0,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 300,
        },
        plugins: {
          legend: {
            labels: {
              color: "#374151",
              font: {
                weight: 'bold',
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ₹${context.parsed.y.toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: "#6b7280",
              maxRotation: 45,
              minRotation: 0,
              maxTicksLimit: 8,
            },
            grid: { color: "#f3f4f6" },
            display: true,
            title: {
              display: true,
              text: 'Last 30 Minutes',
              color: '#9ca3af',
            }
          },
          y: {
            ticks: {
              color: "#6b7280",
              callback: function (value) {
                return '₹' + Number(value).toLocaleString('en-IN');
              }
            },
            grid: { color: "#f3f4f6" },
            display: true,
            beginAtZero: false,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [portfolioHistory]);

  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar />
      <div className="w-[80vw] max-w-[80vw] flex flex-row min-h-screen">
        <div className="w-full mt-20 ">
          <motion.div className="w-[50%] pt-15 " initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <h2 className="pb-10 font-bold text-[40px]">Holdings</h2>
            <div className="flex justify-between pb-10">
              <div className="flex flex-col gap-3">
                <span className="font-bold text-[20px]">Current Value</span>
                <span className="text-[#999999] font-bold">₹{calculateCurrentValue().toFixed(2)}</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-bold text-[20px]">Invested Value</span>
                <span className="text-[#999999] font-bold">₹{calculateInvestedValue().toFixed(2)}</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-bold text-[20px]">P&L</span>
                <span className={`font-bold ${calculateCurrentValue() - calculateInvestedValue() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {calculateCurrentValue() - calculateInvestedValue() >= 0 ? '+' : ''}₹{(calculateCurrentValue() - calculateInvestedValue()).toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div className="w-[60%]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <h2 className="pb-5 font-bold text-[20px]">Your Stocks</h2>
            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">
              {userStocks.length === 0 ? (
                <div className="text-[#999999] py-4">No stocks in your portfolio. Start investing!</div>
              ) : (
                userStocks.map((stock) => {
                  const currentPrice = getCurrentPrice(stock.symbol);
                  const investedValue = stock.quantity * stock.avgprice;
                  const currentValue = stock.quantity * currentPrice;
                  const pnl = currentValue - investedValue;
                  const pnlColor = pnl >= 0 ? 'text-green-600' : 'text-red-600';

                  return (
                    <div key={stock.id} className="flex flex-row gap-3 w-full justify-between p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 transition-all cursor-pointer" onClick={() => handleStockClick(stock.symbol)}>
                      <div className="flex flex-col">
                        <span className="font-bold">{stock.name}</span>
                        <span className="font-medium text-sm text-[#999999]">{stock.symbol}</span>
                        <span className="font-medium">
                          Invested: <span className="text-[#999999] font-semibold">₹{investedValue.toFixed(2)}</span>
                        </span>
                      </div>
                      <div className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <span className="text-[#999999] text-sm">Qty</span>
                          <span className="font-semibold">{stock.quantity}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium">
                            LTP: <span className="text-[#999999] font-semibold">₹{currentPrice.toFixed(2)}</span>
                          </span>
                          <span className="font-medium">
                            Avg: <span className="text-[#999999] font-semibold">₹{stock.avgprice.toFixed(2)}</span>
                          </span>
                          <span className={`font-bold ${pnlColor}`}>
                            {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>

        {/* Chart.js Canvas */}
        <motion.div className="flex flex-col gap-5 w-[60%] mt-20 h-[600px] pt-20">
          <motion.div className="h-[50%]" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <canvas ref={chartContainer}></canvas>
          </motion.div>
          <motion.div className="h-[50%] ">
            <h1 className="font-bold text-[25px]">Wallet</h1>
            <motion.div className="pb-2">
              <div><h2 className="font-bold text-[18px]">Current Balance:<span className="text-[#999999] font-bold">₹{Math.round(currentBalance)}</span></h2></div>
            </motion.div>
            <motion.div className="flex gap-7 pb-5 ">
              <Input placeholder="Enter Amount" name="amount" onChange={(e) => setDepositAmount(Number(e.target.value))
              }></Input>
              <Button label="Add Credits" onClick={addBalance} className="p-2" type="black"></Button>
            </motion.div>
            <motion.div className="flex gap-7  ">
              <Input placeholder="Enter Amount" name="withdraw" onChange={(e) => setWithdrawAmount(Number(e.target.value))}></Input>
              <Button label="Withdraw Credits" onClick={withdrawBalance} className="p-2" type="black"></Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
