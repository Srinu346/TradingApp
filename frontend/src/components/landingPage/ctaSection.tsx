import { motion } from "motion/react"
import { Button } from "../blackButton"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Zap } from "lucide-react"

export const CTASection = () => {
    const navigate = useNavigate();

    return (
        <div className="py-24 w-[80vw] max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-12 md:p-16"
            >
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    {/* Left Content */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
                            <Zap size={14} className="text-amber-400" />
                            <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">Start Today</span>
                        </div>
                        <h2 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
                            Ready to master the markets?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-lg leading-relaxed">
                            Join thousands of traders who are learning, practicing, and growing their investment skills risk-free with TradeX.
                        </p>
                    </div>

                    {/* Right CTA */}
                    <div className="flex flex-col gap-4 items-center md:items-end">
                        <motion.button
                            onClick={() => navigate('/register')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-xl shadow-white/10"
                        >
                            Start Demo Trading
                            <ArrowRight size={18} />
                        </motion.button>
                        <p className="text-gray-500 text-sm">
                            Free forever • No credit card required
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
