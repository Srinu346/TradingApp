import { motion } from "motion/react"
import { UserCheck, LineChart, TrendingUp } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    description: "Sign up for free in under 2 minutes. No credit card required. Get instant access to ₹10,00,000 in virtual trading credits to start practicing immediately.",
    Icon: UserCheck,
    color: "amber",
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    borderColor: "border-amber-100",
  },
  {
    step: "02",
    title: "Track & Trade Markets",
    description: "Access 50+ stocks with real-time price updates every 5 seconds. Use interactive candlestick, line, and area charts to analyze market trends and execute trades.",
    Icon: LineChart,
    color: "emerald",
    gradient: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-100",
  },
  {
    step: "03",
    title: "Analyze & Grow",
    description: "Monitor your portfolio performance with detailed P&L tracking. Learn from your trades, refine your strategies, and build confidence before investing real money.",
    Icon: TrendingUp,
    color: "violet",
    gradient: "from-violet-400 to-purple-500",
    bgGradient: "from-violet-50 to-purple-50",
    borderColor: "border-violet-100",
  },
]

export const StepsSection = () => {
  return (
    <div className="py-24 w-[80vw] max-w-6xl mx-auto flex flex-col gap-16 items-center justify-center" id="features">
      {/* Section Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 bg-black text-white text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
          How It Works
        </span>
        <h2 className="text-black font-bold text-4xl md:text-5xl mb-4">Get started in minutes</h2>
        <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
          Three simple steps to begin your trading journey with zero risk
        </p>
      </motion.div>

      {/* Steps Grid */}
      <div className="w-full flex flex-col gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`flex ${index % 2 === 1 ? 'flex-row-reverse' : 'flex-row'} gap-8 items-stretch`}
          >
            {/* Content Card */}
            <div className={`w-1/2 bg-gradient-to-br ${step.bgGradient} border ${step.borderColor} rounded-3xl p-8 flex flex-col justify-center group hover:shadow-xl transition-all duration-300`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <step.Icon size={24} className="text-white" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r ${step.gradient}`}>
                  Step {step.step}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">{step.title}</h3>
              <p className="text-gray-600 font-medium leading-relaxed">{step.description}</p>
            </div>

            {/* Visual/Icon Card */}
            <div className="w-1/2 bg-white border border-gray-100 rounded-3xl flex items-center justify-center group hover:border-gray-200 hover:shadow-md transition-all duration-300 min-h-[200px]">
              <div className={`w-24 h-24 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <step.Icon size={48} className="text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
