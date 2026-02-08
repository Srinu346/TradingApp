import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function UserMessage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("username");
        if (!user) {
            navigate("/login");
        }
        user && setUsername(user);
    }, [navigate]);

    const date = new Date();
    const year = date.getFullYear();
    const shortMonthName = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();

    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = date.getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
    };

    return (
        <div className="w-full">
            <div className="flex flex-col justify-start gap-2">
                <h1 className="font-bold text-3xl lg:text-4xl leading-tight text-gray-900">
                    {getGreeting()}, {username}! 👋
                </h1>
                <p className="font-medium text-lg lg:text-xl text-gray-500 leading-relaxed">
                    Here's your performance overview for{" "}
                    <span className="text-gray-600">{day} {shortMonthName}, {year}</span>
                </p>
            </div>
        </div>
    )
}