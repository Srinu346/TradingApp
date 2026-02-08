import { motion } from "motion/react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  type?: "black" | "gray";
  disabled?: boolean;
}

const buttonVariants = {
  initial: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -2 },
  tap: { scale: 0.98, y: 0 },
};

export const Button = ({ label, onClick, className, type, disabled }: ButtonProps) => {

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-6 py-2.5 font-medium shadow-sm focus:ring-2 focus:ring-offset-2 ${type === "black"
        ? "bg-black text-white hover:bg-gray-800 hover:shadow-md focus:ring-gray-900"
        : "bg-[#e5e5e5] text-black hover:bg-[#d5d5d5] focus:ring-gray-400"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`}
      variants={disabled ? undefined : buttonVariants}
      initial="initial"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {label}
    </motion.button>
  );
};
