import { InfoBlockComponents } from "./infoBlockComponents";
import { ChartsIcon, WalletIcon, InsightsFill } from "../../icons/LandingPageIcons";
import { motion } from "motion/react";
import { Bell, Users } from "lucide-react";

export const InfoBlocks = () => {
  return (
    <div className="py-24 w-[80vw] max-w-6xl mx-auto flex flex-col gap-16 items-center justify-center" id="services">
      {/* Section Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 bg-black text-white text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
          Our Services
        </span>
        <h2 className="text-black font-bold text-4xl md:text-5xl mb-4">Everything you need to trade</h2>
        <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
          Powerful tools and insights designed to help you make smarter investment decisions
        </p>
      </motion.div>

      {/* Top Row - 3 Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      >
        <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
          <InfoBlockComponents Icon={ChartsIcon} h1="Real-Time Charts" h2="Track live stock movements with interactive candlestick, line, and area charts" />
        </motion.div>
        <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
          <InfoBlockComponents Icon={WalletIcon} h1="Portfolio Management" h2="Monitor all your investments and track P&L in one unified dashboard" />
        </motion.div>
        <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
          <InfoBlockComponents Icon={InsightsFill} h1="Market Insights" h2="Get real-time trends, analytics, and market data at a glance" />
        </motion.div>
      </motion.div>

      {/* Bottom Row - 2 Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
      >
      </motion.div>
    </div>
  )
}
