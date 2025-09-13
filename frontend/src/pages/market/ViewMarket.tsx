import { motion } from "motion/react";
import { NavBar } from "../../components/marketView/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function ViewMarket() {

    const [type, setType] = useState("");

    interface StockProps {
        name: string,
        symbol: string,
        currentPrice: number,
        market: string,
        type: string,
    }

    const navigate = useNavigate();

    const handleStockClick = (stock : StockProps) => {
        const symbol = stock.symbol
        navigate(`/viewStock/${symbol}`);

    };

    const [stocks, setStocks] = useState<StockProps[]>([]);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/allStocks");
                if (!res.ok) {
                    alert("Stock Fetch Failed!!!");
                    return;
                }
                const data = await res.json();
                setStocks(data);
            } catch (err) {
                console.error("Error fetching stocks:", err);
                alert("Something went wrong!");
            }
        };

        fetchStocks();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-[80vw] max-w-[80vw] flex flex-col items-center">
                <NavBar />
                <div className="flex flex-row pt-10 pb-10 gap-10 font-semibold text-[#999999] mt-10 justify-between">
                    <div><button className="hover:text-black transition-colors cursor-pointer" onClick={() => setType("Pharma")}>Pharma</button></div>
                    <div><button className="hover:text-black transition-colors cursor-pointer" onClick={() => setType("Tech")}>Tech</button></div>
                    <div><button className="hover:text-black transition-colors cursor-pointer" onClick={() => setType("Infra")}>Infra</button></div>
                    <div><button className="hover:text-black transition-colors cursor-pointer" onClick={() => setType("Finance")}>Finance</button></div>
                    <div><button className="hover:text-black transition-colors cursor-pointer" onClick={() => setType("")}>All</button></div>
                </div>
                {stocks
                    .filter(stock => !type || stock.type.toLowerCase() === type.toLowerCase())
                    .map((stock, index) => (
                        <div className="grid grid-cols-1 w-full justify-center p-10 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors items-center" onClick={()=>handleStockClick(stock)}>
                            <div className="flex">
                                <div className="w-full font-semibold text-[15px]">
                                    <span>{stock.name}.({stock.symbol})  </span>
                                    <span>- {stock.market}</span>
                                </div>
                                <div className="text-[#999999] font-semibold">
                                    <span>₹{stock.currentPrice}</span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
