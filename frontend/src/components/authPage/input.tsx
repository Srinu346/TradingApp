import {motion} from "motion/react"
type SvgIconType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

interface InputProps {
    placeholder: string,
    value?:string,
    onChange ?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    Icon ?: SvgIconType,
    name:string, 
}

export function Input ({placeholder, value, onChange , name}: InputProps) {
    return (
        <div className="max-w-[40%] w-[40%] pt-3">
            <div className="w-full pr-2 h-[19px]">
                <input placeholder={placeholder} type="text" id={name} className="text-[#333333] font-semibold pl-3" value={value} onChange={onChange} />
            </div>
        </div>    )
}