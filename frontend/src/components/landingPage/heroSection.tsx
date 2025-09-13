import {motion} from "motion/react"
import { Button } from "../blackButton"
import { useNavigate } from "react-router-dom"

export const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-[75vw] flex flex-col items-center justify-center">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-black font-bold text-5xl">Accelerate your trading.</div>
                <div className="text-[#999999] font-normal font-bold text-5xl">Demo.Analyze.Grow</div>
            </div>
        </motion.div>
        <motion.div >
            <div className="mt-10 flex flex-row gap-5">
                <Button label="Start Demo" onClick={() => navigate('/register')} type="black" className="text-white w-[130px] h-[30px] p-1" />
                <Button label="Log In" onClick={() => navigate('/login')} type="gray" className="w-[130px] h-[30px] text-center" />
            </div>
        </motion.div>
        </div>
    )
}