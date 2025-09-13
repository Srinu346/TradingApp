import { motion } from "motion/react";
import { NavBar } from "../../components/dashboard/NavBar";
import { AreaChartIcon, BarChartIcon, CandleChartIcon, LineChartIcon } from "../../icons/AreaChartIcon";
import { AreaSeries, BarSeries, CandlestickSeries, createChart, type IChartApi, type ISeriesApi, LineSeries } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/blackButton";
import { useParams } from "react-router-dom";
import { TurkishLira } from "lucide-react";

interface PriceHistoryProps {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface StockDetailsParams {
  name: string;
  currentPrice: number;
  priceHistory: PriceHistoryProps[];
}

export function ViewStock() {
  const { symbol } = useParams();
  const [stockDetails, setStockDetails] = useState<StockDetailsParams>();
  const [currentChart, setCurrentChart] = useState<"area" | "candle" | "line" | "bar">("area");
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [buy, setBuy] = useState(false);

  const chartElement = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<any> | null>(null);

  // Fetch stock details once and start polling
  useEffect(() => {
    if (!symbol) return;

    const parseTime = (t: any): number => {
      if (typeof t === "number" && Number.isFinite(t)) return t;
      if (typeof t === "string") {
        // yyyy-mm-dd => unix seconds at local midnight
        const ymd = t.match(/^\d{4}-\d{2}-\d{2}$/);
        if (ymd) {
          const [year, month, day] = t.split("-").map((v: string) => parseInt(v, 10));
          const dt = new Date(year, month - 1, day, 0, 0, 0);
          return Math.floor(dt.getTime() / 1000);
        }
        // HH:MM:SS => combine with today
        const hms = t.match(/^\d{2}:\d{2}:\d{2}$/);
        if (hms) {
          const now = new Date();
          const [h, m, s] = t.split(":").map((v: string) => parseInt(v, 10));
          const dt = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, s);
          return Math.floor(dt.getTime() / 1000);
        }
        // ISO datetime string
        const parsed = Date.parse(t);
        if (!Number.isNaN(parsed)) {
          return Math.floor(parsed / 1000);
        }
      }
      // fallback to current unix seconds
      return Math.floor(Date.now() / 1000);
    };

    const normalizeHistory = (history: any[]): PriceHistoryProps[] => {
      if (!Array.isArray(history)) return [] as any;
      const mapped = history.map((p: any) => ({
        time: parseTime(p?.time),
        open: Number(p?.open) || 0,
        high: Number(p?.high) || 0,
        low: Number(p?.low) || 0,
        close: Number(p?.close) || 0,
      }));
      // sort ascending by time
      mapped.sort((a, b) => a.time - b.time);
      // merge duplicates with same timestamp to ensure strictly ascending times
      const merged: PriceHistoryProps[] = [];
      for (const curr of mapped) {
        const last = merged[merged.length - 1];
        if (last && last.time === curr.time) {
          // keep first open, update high/low and close
          last.high = Math.max(last.high, curr.high, curr.close, curr.open);
          last.low = Math.min(last.low, curr.low, curr.close, curr.open);
          last.close = curr.close;
        } else {
          merged.push({ ...curr });
        }
      }
      return merged;
    };

    const fetchStock = async () => {
      const res = await fetch(`http://localhost:3000/api/allStocks/${symbol}`,{method: "GET"});
      const data = await res.json();
      const normalized = {
        ...data,
        priceHistory: normalizeHistory(data?.priceHistory || []),
      } as StockDetailsParams;
      setStockDetails(normalized);
    };

    fetchStock();

    const interval = setInterval(fetchStock, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [symbol]);

  // Initialize chart
  useEffect(() => {
    if (!chartElement.current) return;
    if (!chartRef.current) {
      chartRef.current = createChart(chartElement.current, {
        width: chartElement.current.clientWidth,
        height: chartElement.current.clientHeight,
        layout: { background: { color: "#ffffff" }, textColor: "#000" },
        grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
        timeScale: {timeVisible:true,secondsVisible:true},
      });

      const handleResize = () => {
        if (chartRef.current && chartElement.current) {
          chartRef.current.resize(chartElement.current.clientWidth, chartElement.current.clientHeight);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Update chart whenever stock details or chart type changes
  useEffect(() => {
    if (!chartRef.current || !stockDetails) return;

    const chart = chartRef.current;

    // Remove previous series
    if (seriesRef.current) {
      chart.removeSeries(seriesRef.current);
      seriesRef.current = null;
    }

    // Map priceHistory to correct chart data
    if (currentChart === "area") {
      seriesRef.current = chart.addSeries(AreaSeries, {
        lineColor: "#2962FF",
        topColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0.28)",
      });

      const areaData = stockDetails.priceHistory.map(p => ({ time: p.time, value: p.close }));
      seriesRef.current.setData(areaData);

    } else if (currentChart === "candle") {
      seriesRef.current = chart.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      const candleData = stockDetails.priceHistory.map(p => ({
        time: p.time,
        open: p.open,
        high: p.high,
        low: p.low,
        close: p.close,
      }));
      seriesRef.current.setData(candleData);

    } else if (currentChart === "line") {
      seriesRef.current = chart.addSeries(LineSeries, { color: "#2962FF", lineWidth: 2 });
      const lineData = stockDetails.priceHistory.map(p => ({ time: p.time, value: p.close }));
      seriesRef.current.setData(lineData);

    } else if (currentChart === "bar") {
      seriesRef.current = chart.addSeries(BarSeries);
      const barData = stockDetails.priceHistory.map(p => ({
        time: p.time,
        open: p.open,
        high: p.high,
        low: p.low,
        close: p.close,
      }));
      seriesRef.current.setData(barData);
    }

    return () => {
      if (seriesRef.current) {
        chart.removeSeries(seriesRef.current);
        seriesRef.current = null;
      }
    };
  }, [stockDetails, currentChart]);

  async function handleSell() {
    await fetch("http://localhost:3000/api/sell", { method: "POST" });
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm z-1001">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">{buy ? "Buy" : "Sell"}</h2>
            <h3 className="text-sm font-bold mb-4 text-[#999999]">
              Everything will be executed at market price !!!
            </h3>
            <h3 className="text-sm font-bold mb-4">{stockDetails?.name}</h3>
            <div className="flex flex-col gap-5 mb-4">
              <input
                value={quantity}
                placeholder="Enter quantity"
                type="number"
                onChange={e => setQuantity(parseInt(e.target.value) || 0)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={stockDetails?.currentPrice}
                readOnly
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4 justify-end">
              <Button label={`Confirm ${buy ? "Buy" : "Sell"}`} onClick={() => {}} type="black" className="p-2" />
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-[80vw] max-w-[80vw] flex flex-col items-center">
        <NavBar />
        <div className="w-full flex flex-row justify-between items-center mt-20">
          <div className="flex flex-col gap-2">
            <div className="text-[#999999] font-bold text-[30px]">{symbol}</div>
            <div className="flex gap-2">
              <Button className="p-2" label="Buy" type="black" onClick={() => { setModalOpen(true); setBuy(true); }} />
              <Button className="p-2" label="Sell" onClick={() => { setModalOpen(true); setBuy(false); }} />
            </div>
          </div>

          <div className="flex flex-col items-end">
            <h1 className="text-[40px] font-bold">{stockDetails?.name}</h1>
            <div className="flex flex-row gap-5 mt-2">
              <span className="text-[#999999] font-bold text-[30px]">₹{stockDetails?.currentPrice}</span>
              <span className="text-green-600 font-bold text-[30px]"></span>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full gap-2 items-center p-5 bg-gray-100 rounded-xl">
          <div className="h-[67vh] flex flex-col gap-4 justify-center bg-gray-100">
            <button className="hover:bg-white rounded-sm" onClick={() => setCurrentChart("candle")}><CandleChartIcon /></button>
            <button className="hover:bg-white rounded-sm" onClick={() => setCurrentChart("area")}><AreaChartIcon /></button>
            <button className="hover:bg-white rounded-sm" onClick={() => setCurrentChart("line")}><LineChartIcon /></button>
            <button className="hover:bg-white rounded-sm p-1" onClick={() => setCurrentChart("bar")}><BarChartIcon /></button>
          </div>
          <div className="w-full border-solid border-blue-500 h-[70vh] bg-gray-100" ref={chartElement}></div>
        </div>
      </div>
    </div>
  );
}
