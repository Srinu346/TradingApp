import { motion } from "motion/react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  type?: "black" | "gray";
}

const buttonVariants = {
  initial: { scale: 1, borderRadius: "9999px" },
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

export const Button = ({ label, onClick, className, type }: ButtonProps) => {

  return (
    <motion.button
      onClick={onClick}
      className={`rounded-full  ${type === "black" ? "bg-black text-white" : "bg-[#c5c5c5] text-black"} ${className || ""}`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      {label}
    </motion.button>
  );
};
