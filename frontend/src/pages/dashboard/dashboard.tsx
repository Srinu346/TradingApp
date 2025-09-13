import { NavBar } from "../../components/dashboard/NavBar"
import { Stats } from "../../components/dashboard/statCard"
import { UserMessage } from "../../components/dashboard/UserMessage"
import { MarketNews } from "../../components/dashboard/MarketNews"
import { Footer } from "../../components/footer"
import { motion } from "motion/react"

export function DashBoardPage() {
  return (
    <motion.div className="flex flex-col justify-center items-center">
      <motion.div initial={{ opacity: 0 , x:-50 }} animate={{ opacity: 1 , x:0 }} transition={{ duration: 0.4, when: 'beforeChildren', staggerChildren: 0.25 }} className="w-full h-[20vh]">
        <NavBar />
      </motion.div>
      <motion.div initial={{ opacity: 0 , y:16 }} animate={{ opacity: 1 , y:0 }} transition={{ duration: 0.4, when: 'beforeChildren', staggerChildren: 0.25 }} className=" pb-10 gap-10 mt-20 flex flex-col justify-between items-center h-screen"> {/* padding so content doesn’t hide behind fixed navbar */}
        <div><Stats /></div>
        <div><UserMessage/></div>
        <div ><MarketNews/></div>
      </motion.div>
      <div className="pt-50">
        <Footer />
      </div>
    </motion.div>
  )
}
