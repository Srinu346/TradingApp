import { motion, spring } from "motion/react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "TradeX completely transformed my trading journey. The real-time charts and demo mode helped me practice without any risk. Now I feel confident making informed decisions. Highly recommend for beginners!",
    name: "Rahul Sharma",
    location: "Mumbai",
    initials: "RS",
    color: "from-amber-400 to-orange-500",
  },
  {
    quote: "The portfolio management feature is incredibly intuitive. I can track all my investments in one place, see my P&L instantly, and the smart alerts keep me updated on market movements. Best trading app I've used!",
    name: "Priya Patel",
    location: "Bangalore",
    initials: "PP",
    color: "from-emerald-400 to-teal-500",
  },
  {
    quote: "As a beginner, I was scared to invest real money. TradeX's demo trading with virtual credits gave me the perfect sandbox to learn. The interface is clean, fast, and the market insights are spot on!",
    name: "Arjun Reddy",
    location: "Hyderabad",
    initials: "AR",
    color: "from-violet-400 to-purple-500",
  },
]

export const Testimonials = () => {
  return (
    <div className="py-24 w-[80vw] max-w-6xl mx-auto flex flex-col" id="testimonials">
      {/* Section Header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: spring }}
      >
        <span className="inline-block px-4 py-1.5 bg-black text-white text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
          Testimonials
        </span>
        <h2 className="text-black font-bold text-4xl md:text-5xl mb-4">What our users say</h2>
        <span className="text-gray-500 font-medium text-lg max-w-2xl">
          Join thousands of traders who have transformed their investing journey with TradeX
        </span>
      </motion.div>

      {/* Testimonials Grid */}
      <motion.div
        className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: spring, delay: 0.2 }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white border border-gray-100 p-8 rounded-3xl flex flex-col justify-between group hover:shadow-xl hover:border-gray-200 transition-all duration-300"
          >
            {/* Quote Icon */}
            <div className="mb-4">
              <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.color} rounded-lg flex items-center justify-center shadow-lg opacity-80`}>
                <Quote size={20} className="text-white" />
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote Text */}
            <p className="text-gray-600 text-[15px] leading-relaxed flex-grow mb-6">
              "{testimonial.quote}"
            </p>

            {/* User Info */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center shadow-md`}>
                <span className="text-white font-bold text-sm">{testimonial.initials}</span>
              </div>
              <div>
                <p className="text-black font-semibold">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

