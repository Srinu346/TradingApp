import { motion, spring } from "motion/react"

export const Testimonials = () => {
  return (
    <div className="w-[70vw] max-w-[80vw] pb-25 flex flex-col" id="testimonials">
      <motion.div className="w-full" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, type: spring }}>
        <div className="pb-20 w-full " id="testimonials">
          <h3 className="text-black font-bold text-4xl">What Users Say</h3>
          <h3 className="text-[#999999] font-medium text-3xl">Real feedback from our community</h3>
        </div>
      </motion.div>

      <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, type: spring, delay: 0.3 }} >
        <div className="bg-[#f5f5f5] p-10 h-[50vh] rounded-lg flex flex-col justify-between">
          <p className="text-[#777777] text-[15px] text-start">"TradeX completely transformed my trading journey. The real-time charts and demo mode helped me practice without any risk. Now I feel confident making informed decisions. Highly recommend for beginners!"</p>
          <p className="text-[#000000] font-semibold text-[15px] text-start">- Rahul Sharma, Mumbai</p>
        </div>
        <div className="bg-[#f5f5f5] p-10 h-[50vh] rounded-lg flex flex-col justify-between">
          <p className="text-[#777777] text-[15px] text-start">"The portfolio management feature is incredibly intuitive. I can track all my investments in one place, see my P&L instantly, and the smart alerts keep me updated on market movements. Best trading app I've used!"</p>
          <p className="text-[#000000] text-[15px] text-start font-semibold">- Priya Patel, Bangalore</p>
        </div>
        <div className="bg-[#f5f5f5] p-10 h-[50vh] rounded-lg flex flex-col justify-between">
          <p className="text-[#777777] text-[15px] text-start">"As a beginner, I was scared to invest real money. TradeX's demo trading with virtual credits gave me the perfect sandbox to learn. The interface is clean, fast, and the market insights are spot on!"</p>
          <p className="text-[#000000] text-[15px] text-start font-semibold">- Arjun Reddy, Hyderabad</p>
        </div>
      </motion.div>
    </div>

  )
}
