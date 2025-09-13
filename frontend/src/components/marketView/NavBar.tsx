import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"


export function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Add actual logout logic here
    navigate('/');
  };

  return (
    <div className="w-full pt-5 pb-5 fixed top-0 left-0 right-0  backdrop-blur-md z-50">
      <div className="flex flex-row justify-between mx-auto max-w-[80vw]">
        <div>
          <h2 className="text-xl font-bold text-black cursor-pointer" onClick={() => navigate('/')}>TradeX</h2>
        </div>
        <div className="flex flex-row gap-3 semibold text-[#999999] items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="bg-[#eeeeee] rounded-lg p-1 text-black cursor-pointer hover:bg-[#dddddd] transition-colors">Dashboard</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/holdings'); }} className="bg-[#eeeeee] rounded-lg p-1 text-black cursor-pointer hover:bg-[#dddddd] transition-colors">Portfolio</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/viewMarket'); }} className="bg-[#eeeeee] rounded-lg p-1 text-black cursor-pointer hover:bg-[#dddddd] transition-colors">Reports</a>
        </div>
        <div>
            <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="bg-[#eeeeee] rounded-lg p-1 text-black cursor-pointer hover:bg-[#dddddd] transition-colors">Logout</a>
        </div>
      </div>
    </div>
  )
}
