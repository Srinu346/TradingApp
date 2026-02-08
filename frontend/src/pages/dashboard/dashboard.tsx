import { NavBar } from "../../components/dashboard/NavBar"
import { Stats } from "../../components/dashboard/statCard"
import { UserMessage } from "../../components/dashboard/UserMessage"
import { MarketNews } from "../../components/dashboard/MarketNews"
import { Footer } from "../../components/footer"
import { motion } from "motion/react"

export function DashBoardPage() {

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Fixed NavBar */}
      <NavBar />

      {/* Main Content - with proper spacing from fixed navbar */}
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section 1: User Greeting */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <UserMessage />
          </motion.section>

          {/* Section 2: Stats Cards */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-12"
          >
            <Stats />
          </motion.section>

          {/* Section 3: Market News */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <MarketNews />
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
