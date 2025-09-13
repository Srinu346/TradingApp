import { easeInOut, motion } from "motion/react"
import { LinkedIn } from "../icons/linkedInIcon"
import { GitHubIcon } from "../icons/githubIcon"
import { XIcon } from "../icons/xIcon"

export const Footer = () => {

  const footerTitle = "text-black font-semibold text-base"
  const footerContent = "text-[#999999] font-medium text-base hover:text-black transition-colors duration-200"

  return (
    <div className="w-[70vw] max-w-[80vw] pt-25 flex justify-between">

      {/* Brand */}
      <motion.div
        className="w-[50vw] flex items-start"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
      >
        <span className="text-lg font-bold text-black">TradeX</span>
      </motion.div>

      {/* Quick Links */}
      <div className="w-[50%] flex gap-5">
        <motion.div
        className="flex flex-col space-y-4 w-full"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
      >
        <div className={footerTitle}>Quick Links</div>
        <div className="flex flex-col space-y-4">
          <a href="#" className={footerContent}>Home</a>
          <a href="#" className={footerContent}>Features</a>
          <a href="#" className={footerContent}>Contact</a>
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div
        className=" w-[50%] flex flex-col gap-5"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: easeInOut }}
      >
        <div className={footerTitle}>Follow Us</div>
        <div className="flex flex-col space-y-4 w-full justify-center items-center">
          <div><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#999999] hover:text-black transition-colors duration-200">
            <XIcon />
          </a></div>
          <div><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#999999] hover:text-black transition-colors duration-200">
            <LinkedIn />
          </a></div>
          <div><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#999999] hover:text-black transition-colors duration-200">
            <GitHubIcon />
          </a></div>
          </div>
      </motion.div>
      </div>
    </div>
  )
}
