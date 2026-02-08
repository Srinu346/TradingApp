import { motion } from "motion/react";
import { NavBar } from "../../components/dashboard/NavBar";
import { Footer } from "../../components/footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface StockProps {
    name: string;
    symbol: string;
    currentPrice: number;
    market: string;
    type: string;
}

export function ViewMarket() {
    const [type, setType] = useState("");
    const [stocks, setStocks] = useState<StockProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleStockClick = (stock: StockProps) => {
        navigate(`/viewStock/${stock.symbol}`);
    };

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                setIsLoading(true);
                const res = await fetch("http://localhost:3000/api/allStocks");
                if (!res.ok) {
                    console.error("Stock Fetch Failed");
                    return;
                }
                const data = await res.json();
                setStocks(data);
            } catch (err) {
                console.error("Error fetching stocks:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStocks();
    }, []);

    const filterCategories = ["All", "Pharma", "Tech", "Infra", "Finance"];

    const filteredStocks = stocks.filter(
        stock => !type || stock.type.toLowerCase() === type.toLowerCase()
    );

    return (
        <div className="min-h-screen bg-[#fafafa]">
            <NavBar />

            <main className="pt-24 pb-16 min-h-screen">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="font-bold text-3xl text-gray-900">Market</h1>
                        <p className="text-gray-500 mt-1">Browse and trade stocks</p>
                    </motion.div>

                    {/* Filter Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap gap-3 mb-8"
                    >
                        {filterCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setType(category === "All" ? "" : category)}
                                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ${(category === "All" && !type) || type === category
                                    ? "bg-black text-white shadow-sm"
                                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Stock List */}
                    <div className="space-y-3">
                        {isLoading ? (
                            // Loading skeleton
                            [...Array(5)].map((_, index) => (
                                <div key={index} className="p-5 bg-white border border-gray-100 rounded-xl animate-pulse">
                                    <div className="flex justify-between">
                                        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                                        <div className="h-5 bg-gray-200 rounded w-20"></div>
                                    </div>
                                </div>
                            ))
                        ) : filteredStocks.length > 0 ? (
                            filteredStocks.map((stock, index) => (
                                <motion.div
                                    key={stock.symbol}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    onClick={() => handleStockClick(stock)}
                                    className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {stock.name}
                                                    <span className="text-gray-400 font-normal ml-2">
                                                        ({stock.symbol})
                                                    </span>
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-0.5">
                                                    {stock.market} • {stock.type}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg text-gray-900">
                                                ₹{stock.currentPrice.toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-16 text-gray-500">
                                <p className="font-medium">No stocks found</p>
                                <p className="text-sm mt-1">Try a different filter</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
