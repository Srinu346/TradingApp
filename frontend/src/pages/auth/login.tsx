import { Button } from "../../components/blackButton"
import { motion } from "motion/react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import {z} from "zod"

const FormInput = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})


export function LoginPage () {
    const navigate = useNavigate();

    const FormInput = z.object({
        username: z.string().min(2, "Username must be at least 2 characters"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    })

    const [formData,setFormData] = useState({
        username: "",
        password: ""
    });

    const handleLogin = async () => {

        const result = FormInput.safeParse(formData);

        if (!result.success) {
            // Handle validation errors
            console.log(result.error.format());
            return;
        }

        const response = await fetch("http://localhost:3000/auth/signin",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ username: formData.username, password: formData.password })
        });

        if(!response.ok){
            console.error("Login failed");
            return;
        }

        const data = await response.json();

        localStorage.setItem("token",data.token);
        localStorage.setItem("username",data.username);
        
        console.log("Login successful", data);
        navigate('/dashboard');
    };

    return (
        <div className="flex items-center justify-center">
            <div className=" max-w-[30vw] flex flex-col justify-center items-center h-screen gap-10">
                <motion.div className="flex flex-col items-center" initial={{opacity:0,y:-50}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
                <h2 className="font-bold text-[40px]">Sign In</h2>
                <h3 className="font-bold text-[40px] text-[#999999]">Welcome Back</h3>
                </motion.div>
                <motion.div className="flex flex-col w-full" initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{duration:0.5, delay:0.2}}>
                    <form className="flex flex-col gap-4 w-full" onSubmit={(e) => { e.preventDefault(); }}>
                        <input type="username" placeholder="Username" name="username" className="bg-[#eeeeee] rounded-md p-2" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                        <input type="password" placeholder="Password" name="password" className="bg-[#eeeeee] rounded-md p-2" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        <Button type="black" onClick={handleLogin} label="Sign In" />
                    </form>
                </motion.div>
            </div>

        </div>
    )
}