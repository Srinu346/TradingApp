import { motion } from "motion/react"
import { LinkedIn } from "../../icons/linkedInIcon"
import { GitHubIcon } from "../../icons/githubIcon"
import { XIcon } from "../../icons/xIcon"
import { useNavigate } from "react-router-dom"

export function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="w-full pt-5 pb-5 fixed top-0 left-0 right-0  backdrop-blur-md z-50">
      <div className="flex flex-row justify-between mx-auto max-w-[80vw]">
        <div>
          <h2 className="text-xl font-bold text-black cursor-pointer" onClick={() => navigate('/')}>TradeX</h2>
        </div>
        <div className="flex flex-row gap-3 semibold text-[#999999] items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="cursor-pointer hover:text-black transition-colors">Dashboard</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/holdings'); }} className="cursor-pointer hover:text-black transition-colors">Portfolio</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/viewMarket'); }} className="cursor-pointer hover:text-black transition-colors">Market</a>
        </div>
        <div className="flex flex-row gap-5 justify-end items-center semibold text-[#999999]">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedIn /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><XIcon /></a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a>
        </div>
      </div>
    </div>
  )
}
