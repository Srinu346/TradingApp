import { motion, useScroll } from "motion/react";
import { NavBar } from "../../components/marketView/NavBar";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Button } from "../../components/blackButton";
import { Input } from "../../components/authPage/input";

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
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [userStocks, setUserStocks] = useState<StockHolding[]>([]);
  const [masterStocks, setMasterStocks] = useState<MasterStock[]>([]);

  const addBalance = async () => {
    const amount = depositAmount;
    if (amount === 0) {
      alert("Please Add Atleast Minimum $100");
      return;
    }

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) {
      alert("please login first");
      return;
    }

    if (!username) {
      alert("please login first");
      return;
    }

    const response = await fetch('http://localhost:3000/api/addBalance', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify({ amount: depositAmount, username: username })
    })

    if (response.ok) {
      alert("Balance added Successfully");
    }
    else {
      alert("Error !!!");
    }

  }

  const withdrawBalance = async () => {
    const amount = withdrawAmount;
    if (amount === 0) {
      alert("Please Add Atleast Minimum $1000");
      return;
    }

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token) {
      alert("please login first");
      return;
    }

    if (!username) {
      alert("please login first");
      return;
    }

    const response = await fetch('http://localhost:3000/api/withdrawBalance', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify({ amount: withdrawAmount, username: username })
    })

    if (response.ok) {
      alert("Balance withdrawn Successfully");
    }
    else {
      alert("Error !!!");
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

  useEffect(() => {
    if (!chartContainer.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartContainer.current, {
      type: "line",
      data: {
        labels: ["2025-08-01", "2025-08-02", "2025-08-03"],
        datasets: [
          {
            label: "Current",
            data: [150, 150, 150],
            borderColor: "#2962FF",
            backgroundColor: "rgba(41, 98, 255, 0.2)",
            borderWidth: 2,
            tension: 0.3, // smooth curve
            fill: false,
          },
          {
            label: "Invested",
            data: [150, 167, 148],
            borderColor: "#3d4a6e1d",
            backgroundColor: "rgba(41, 98, 255, 0.2)",
            borderWidth: 2,
            tension: 0.3, // smooth curve
            fill: false,
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#000",
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#000" },
            grid: { color: "#eee" },
            display: false
          },
          y: {
            ticks: { color: "#000" },
            grid: { color: "#eee" },
            display: false
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[80vw] max-w-[80vw] flex flex-row ">
        <div className="w-full mt-20 ">
          <div>
            <NavBar />
          </div>

          <motion.div className="w-[50%] pt-15" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
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
                    <div key={stock.id} className="flex flex-row gap-3 w-full justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
              <div><h2 className="font-bold text-[18px]">Current Balance:<span className="text-[#999999] font-bold">{currentBalance}</span></h2></div>
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
    </div>
  );
}
