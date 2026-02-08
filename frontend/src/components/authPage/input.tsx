type SvgIconType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

interface InputProps {
    placeholder: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    Icon?: SvgIconType,
    name: string,
    type?: string,
    className?: string,
}

export function Input({ placeholder, value, onChange, name, type = "text", className }: InputProps) {
    return (
        <div className={`w-full ${className || ""}`}>
            <input
                placeholder={placeholder}
                type={type}
                id={name}
                name={name}
                className="w-full text-[#333333] font-medium hover:border-gray-400 focus:border-black focus:ring-2 focus:ring-black/5"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}