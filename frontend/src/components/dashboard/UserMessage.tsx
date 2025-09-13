import {motion} from "motion/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export function UserMessage () {
    const navigate = useNavigate();

    const [username,setUsername] = useState("");

    useEffect(()=>{
        const user = localStorage.getItem("username");
        if(!user){
            navigate("/login");
        }
        user && setUsername(user);
    })

    const date = new Date();

    const year = date.getFullYear();
    const shortMonthName = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate(); 

    return (
        <div className="max-w-[80vw] w-[80vw] pt-10">
            <div className="flex flex-col justify-start">
                <p className="font-bold text-[32px] ">
                    Hello {username}. <br/>
                     Welcome to your dashboard.
                </p>
                <p className="font-bold text-[32px] text-[#999999]">
                    Latest updates and your performance <br/> overview for {day} {shortMonthName} , {year}.
                </p>
            </div>
        </div>
    )
}