import { LinkedIn } from "../icons/linkedInIcon"
import { GitHubIcon } from "../icons/githubIcon"
import { XIcon } from "../icons/xIcon"
import { motion } from "motion/react"

export const Footer = () => {

  const footerTitle = "text-black font-semibold text-sm mb-5 uppercase tracking-wider"
  const footerContent = "text-gray-500 font-medium text-sm hover:text-black transition-colors duration-200"

  return (
    <footer className="w-full bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-2xl font-bold text-black tracking-tight">TradeX</span>
            <p className="text-gray-500 font-medium text-sm mt-4 leading-relaxed">
              The ultimate demo trading platform. Practice, learn, and master the markets risk-free.
            </p>
            {/* Social Links */}
            <div className="flex flex-row gap-3 mt-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
              >
                <XIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
              >
                <LinkedIn />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-black hover:text-white transition-all duration-300"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className={footerTitle}>Quick Links</div>
            <div className="flex flex-col space-y-3">
              <a href="/" className={footerContent}>Home</a>
              <a href="/dashboard" className={footerContent}>Dashboard</a>
              <a href="/viewMarket" className={footerContent}>Market</a>
              <a href="/holdings" className={footerContent}>Portfolio</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <div className={footerTitle}>Company</div>
            <div className="flex flex-col space-y-3">
              <a href="#" className={footerContent}>About Us</a>
              <a href="#" className={footerContent}>Pricing</a>
              <a href="#" className={footerContent}>Support</a>
              <a href="#" className={footerContent}>Contact</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className={footerTitle}>Legal</div>
            <div className="flex flex-col space-y-3">
              <a href="#" className={footerContent}>Privacy Policy</a>
              <a href="#" className={footerContent}>Terms of Service</a>
              <a href="#" className={footerContent}>Cookie Policy</a>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-10 mt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm">© 2026 TradeX. All rights reserved.</p>
          <p className="text-gray-400 text-sm">Made with ❤️ for traders everywhere</p>
        </motion.div>
      </div>
    </footer>
  )
}
