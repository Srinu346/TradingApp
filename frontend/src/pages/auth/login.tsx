import { Button } from "../../components/blackButton"
import { motion } from "motion/react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { addToast } from "@heroui/toast"

const FormInput = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})


export function LoginPage() {
    const navigate = useNavigate();

    const FormInput = z.object({
        username: z.string().min(2, "Username must be at least 2 characters"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    })

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleLogin = async () => {

        const result = FormInput.safeParse(formData);

        if (!result.success) {
            // Handle validation errors with toast notifications
            result.error.issues.forEach((issue) => {
                addToast({
                    title: "Validation Error",
                    description: issue.message,
                    color: "danger",
                });
            });
            return;
        }

        const response = await fetch("http://localhost:3000/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: formData.username, password: formData.password })
        });

        if (!response.ok) {
            addToast({
                title: "Login Failed",
                description: "Invalid username or password. Please try again.",
                color: "danger",
            });
            return;
        }

        const data = await response.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        addToast({
            title: "Welcome back!",
            description: "Login successful. Redirecting to dashboard...",
            color: "success",
        });
        navigate('/dashboard');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50">
            <div className="w-full max-w-md flex flex-col justify-center items-center gap-8 p-8">
                <motion.div 
                    className="flex flex-col items-center gap-2" 
                    initial={{ opacity: 0, y: -30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="font-bold text-4xl tracking-tight">Sign In</h2>
                    <h3 className="font-semibold text-2xl text-[#999999]">Welcome Back</h3>
                </motion.div>
                <motion.div 
                    className="flex flex-col w-full" 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5, delay: 0.15 }}
                >
                    <form className="flex flex-col gap-4 w-full" onSubmit={(e) => { e.preventDefault(); }}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            name="username" 
                            className="bg-[#f5f5f5] border border-transparent rounded-xl px-4 py-3 text-base focus:border-black focus:bg-white transition-all duration-200" 
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            className="bg-[#f5f5f5] border border-transparent rounded-xl px-4 py-3 text-base focus:border-black focus:bg-white transition-all duration-200" 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                        />
                        <div className="pt-2">
                            <Button type="black" onClick={handleLogin} label="Sign In" className="w-full py-3" />
                        </div>
                    </form>
                    <motion.p 
                        className="text-center text-[#999999] mt-6 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Don't have an account?{" "}
                        <span 
                            className="text-black font-medium cursor-pointer hover:underline" 
                            onClick={() => navigate('/register')}
                        >
                            Sign Up
                        </span>
                    </motion.p>
                </motion.div>
            </div>
        </div>
    )
}