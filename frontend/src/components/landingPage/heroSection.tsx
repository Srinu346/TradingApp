import { motion } from "motion/react"
import { Button } from "../blackButton"
import { useNavigate } from "react-router-dom"
import { Sparkles } from "lucide-react"

export const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-[80vw] max-w-6xl flex flex-col items-center justify-center relative">
            {/* Subtle background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl" />
            </div>

            {/* Main Headline */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative z-10"
            >
                <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="text-black font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight text-center">
                        Accelerate your trading.
                    </h1>
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 font-semibold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                        Demo. Analyze. Grow.
                    </h2>
                </div>
            </motion.div>

            {/* Subtext */}
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-gray-500 text-lg md:text-xl max-w-xl text-center leading-relaxed"
            >
                Master the markets with real-time data, zero risk. Practice trading with virtual funds before investing real money.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <div className="mt-10 flex flex-row gap-4">
                    <Button
                        label="Start Demo Trading"
                        onClick={() => navigate('/register')}
                        type="black"
                        className="text-white px-8 py-3 text-base font-semibold"
                    />
                    <Button
                        label="Sign In"
                        onClick={() => navigate('/login')}
                        type="gray"
                        className="px-8 py-3 text-base font-semibold"
                    />
                </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-16 flex flex-row gap-12 md:gap-16"
            >
                <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-black">50+</span>
                    <span className="text-sm text-gray-500 font-medium">Stocks</span>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-black">5s</span>
                    <span className="text-sm text-gray-500 font-medium">Live Updates</span>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div className="flex flex-col items-center">
                    <span className="text-2xl md:text-3xl font-bold text-black">100%</span>
                    <span className="text-sm text-gray-500 font-medium">Free</span>
                </div>
            </motion.div>
        </div>
    )
}