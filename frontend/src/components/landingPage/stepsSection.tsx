import { motion } from "motion/react"
import { UserCheck, LineChart, Bell } from "lucide-react" // optional icons

export const StepsSection = () => {
  return (
    <div className="pt-50 pb-50 h-[150vh] w-[70vw] max-w-[80vw] mx-auto flex flex-col gap-10 items-center justify-center" id="features">
      <div className="flex flex-col w-full h-full">
        
        {/* Step 1 */}
        <motion.div className="flex h-1/3" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="w-[50%] h-full flex flex-col items-start justify-center">
            <h2 className="text-black font-bold text-[20px]">Step 1: Create Your Account</h2>
            <p className="text-[#999999] font-medium text-[16px] mt-2">Sign up and set up your portfolio in just a few clicks.</p>
          </div>
          <div className="w-[50%] h-full flex flex-col items-center justify-center bg-[#f5f5f5] rounded-xl">
            <UserCheck size={50} className="text-yellow-500" />
          </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div className="flex h-1/3" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="w-[50%] h-full flex flex-col items-center justify-center bg-[#f5f5f5] rounded-xl">
            <LineChart size={50} className="text-green-500" />
          </div>
          <div className="w-[50%] h-full flex flex-col items-end justify-center ">
            <h2 className="text-[#999999] font-medium text-[20px]">Step 2: Track Markets</h2>
            <p className="text-[#999999] text-[16px] mt-2 text-right">Practice real trades in demo mode with live data.</p>
          </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div className="flex h-1/3" initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="w-[50%] h-full flex flex-col items-start justify-center ">
            <h2 className="text-[#999999] font-medium text-[20px]">Step 3: Get Smart Alerts</h2>
            <p className="text-[#999999] text-[16px] mt-2">Track your progress and upgrade to real trading!</p>
          </div>
          <div className="w-[50%] h-full flex flex-col items-center justify-center bg-[#f5f5f5] rounded-xl">
            <Bell size={50} className="text-red-500" />
          </div>
        </motion.div>

      </div>
    </div>
  )
}
