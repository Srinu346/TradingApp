import { motion } from "motion/react";
import { Button } from "../blackButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsScrolled(scrollTop > 10);
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

  return (
    <div className={`flex flex-row justify-between items-center p-5 w-[80vw] max-w-[80vw] mx-auto fixed top-0 left-0 right-0 z-1000 ${isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md rounded-xl transition-all duration-200" : "bg-transparent"}`}>
      <div className="flex flex-row gap-10 items-center">
        <span className="text-lg font-bold text-black cursor-pointer" onClick={() => navigate('/')}>TradeX</span>
        <motion.div className="flex flex-row gap-6 items-center">
          <a href="#services" className="text-gray-400 font-normal cursor-pointer hover:text-black transition-colors">
            Services
          </a>
          <a href="#features" className="text-gray-400 font-normal cursor-pointer hover:text-black transition-colors">
            Features
          </a>
          <a href="#testimonials" className="text-gray-400 font-normal cursor-pointer hover:text-black transition-colors">
            Testimonials
          </a>
        </motion.div>
      </div>
      <div>
        <Button
          label="Get Started"
          onClick={() => navigate('/register')}
          type="black"
          className="w-[110px] h-[36px] text-white text-sm font-bold bg-black rounded-lg hover:bg-gray-800 transition-colors"
        />
      </div>
    </div>
  );
};
