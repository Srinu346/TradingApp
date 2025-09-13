import { InfoBlockComponents } from "./infoBlockComponents";
import { ChartsIcon, WalletIcon, InsightsFill } from "../../icons/LandingPageIcons";
import { motion } from "motion/react";

export const InfoBlocks = () => {
  return (
    <div className="h-[150vh] w-[70vw] max-w-[80vw] mx-auto flex flex-col gap-10 items-center justify-center" id="services">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full h-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300 }}>
          <InfoBlockComponents Icon={ChartsIcon} h1="Real-Time Charts" h2="Track live stock movements instantly" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300 }}>
          <InfoBlockComponents Icon={WalletIcon} h1="Portfolio Management" h2="Monitor investments in one place" />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300 }}>
          <InfoBlockComponents Icon={InsightsFill} h1="Market Insights" h2="Get trends and analytics at a glance" />
        </motion.div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-[90%] h-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="flex flex-col space-y-3"
        >
          <InfoBlockComponents  />
          <h2 className="text-lg text-left text-[#000000] font-semibold">Smart Alerts</h2>
          <h3 className="text-left text-[#999999] font-semibold">Stay notified on price changes</h3>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="flex flex-col space-y-3"
        >
          <InfoBlockComponents  />
          <h2 className="text-lg text-[#000000] text-left font-semibold">Community Hub</h2>
          <h3 className="text-left text-[#999999] font-semibold">Engage with other traders</h3>
        </motion.div>
      </motion.div>
    </div>
  )
}
