import { motion } from "motion/react"
import { UserCheck, LineChart, Bell, TrendingUp } from "lucide-react"

export const StepsSection = () => {
  return (
    <div className="pt-50 pb-50 h-[150vh] w-[70vw] max-w-[80vw] mx-auto flex flex-col gap-10 items-center justify-center" id="features">

      {/* Section Header */}
      <motion.div
        className="text-center pb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-black font-bold text-4xl mb-4">How It Works</h2>
        <p className="text-[#999999] font-medium text-xl">Get started in 3 simple steps</p>
      </motion.div>

      <div className="flex flex-col w-full h-full">

        {/* Step 1 */}
        <motion.div className="flex h-1/3" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="w-[50%] h-full flex flex-col items-start justify-center pr-10">
            <span className="text-yellow-500 font-bold text-sm mb-2">STEP 01</span>
            <h2 className="text-black font-bold text-[24px]">Create Your Account</h2>
            <p className="text-[#999999] font-medium text-[16px] mt-3">Sign up for free in under 2 minutes. No credit card required. Get instant access to ₹10,00,000 in virtual trading credits to start practicing immediately.</p>
          </div>
          <div className="w-[50%] h-full flex flex-col items-center justify-center bg-[#f5f5f5] rounded-xl">
            <UserCheck size={60} className="text-yellow-500" />
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div className="flex h-1/3" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="w-[50%] h-full flex flex-col items-center justify-center bg-[#f5f5f5] rounded-xl">
            <LineChart size={60} className="text-green-500" />
          </div>
          <div className="w-[50%] h-full flex flex-col items-end justify-center pl-10">
            <span className="text-green-500 font-bold text-sm mb-2">STEP 02</span>
            <h2 className="text-black font-bold text-[24px]">Track & Trade Markets</h2>
            <p className="text-[#999999] text-[16px] mt-3 text-right">Access 50+ stocks with real-time price updates every 5 seconds. Use interactive candlestick, line, and area charts to analyze market trends and execute trades.</p>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div className="flex h-1/3" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="w-[50%] h-full flex flex-col items-start justify-center pr-10">
            <span className="text-red-500 font-bold text-sm mb-2">STEP 03</span>
            <h2 className="text-black font-bold text-[24px]">Analyze & Grow</h2>
            <p className="text-[#999999] text-[16px] mt-3">Monitor your portfolio performance with detailed P&L tracking. Learn from your trades, refine your strategies, and build confidence before investing real money.</p>
          </div>
          <div className="w-[50%] h-full flex flex-col items-center justify-center bg-[#f5f5f5] rounded-xl">
            <TrendingUp size={60} className="text-red-500" />
          </div>
        </motion.div>

      </div>
    </div>
  )
}

