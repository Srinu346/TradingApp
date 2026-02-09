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
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-row justify-between items-center px-8 py-4 w-[85vw] max-w-6xl mx-auto fixed top-4 left-0 right-0 z-[1000] rounded-2xl transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border border-gray-100"
          : "bg-transparent"
        }`}
    >
      <div className="flex flex-row gap-12 items-center">
        <span
          className="text-xl font-bold text-black cursor-pointer tracking-tight"
          onClick={() => navigate('/')}
        >
          TradeX
        </span>
        <div className="flex flex-row gap-8 items-center">
          <a
            href="#services"
            className="text-gray-500 font-medium text-sm cursor-pointer hover:text-black transition-colors relative group"
          >
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#features"
            className="text-gray-500 font-medium text-sm cursor-pointer hover:text-black transition-colors relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#testimonials"
            className="text-gray-500 font-medium text-sm cursor-pointer hover:text-black transition-colors relative group"
          >
            Testimonials
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
        >
          Sign In
        </button>
        <Button
          label="Get Started"
          onClick={() => navigate('/register')}
          type="black"
          className="px-5 py-2.5 text-sm font-semibold"
        />
      </div>
    </motion.nav>
  );
};
