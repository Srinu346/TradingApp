import { LinkedIn } from "../icons/linkedInIcon"
import { GitHubIcon } from "../icons/githubIcon"
import { XIcon } from "../icons/xIcon"

export const Footer = () => {

  const footerTitle = "text-black font-semibold text-base mb-4"
  const footerContent = "text-gray-500 font-medium text-sm hover:text-black transition-colors duration-200"

  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="text-xl font-bold text-black">TradeX</span>
            <p className="text-gray-500 font-medium text-sm mt-3 leading-relaxed">
              The ultimate demo trading platform. Practice, learn, and master the markets risk-free.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className={footerTitle}>Quick Links</div>
            <div className="flex flex-col space-y-2">
              <a href="/" className={footerContent}>Home</a>
              <a href="/dashboard" className={footerContent}>Dashboard</a>
              <a href="/viewMarket" className={footerContent}>Market</a>
              <a href="/holdings" className={footerContent}>Portfolio</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <div className={footerTitle}>Company</div>
            <div className="flex flex-col space-y-2">
              <a href="#" className={footerContent}>About Us</a>
              <a href="#" className={footerContent}>Pricing</a>
              <a href="#" className={footerContent}>Support</a>
              <a href="#" className={footerContent}>Contact</a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <div className={footerTitle}>Follow Us</div>
            <div className="flex flex-row gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition-colors duration-200"
              >
                <XIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition-colors duration-200"
              >
                <LinkedIn />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition-colors duration-200"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2026 TradeX. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 text-sm hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 text-sm hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

