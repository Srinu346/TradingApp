interface InfoBlockProps {
  Icon?: React.ComponentType; // React component for icons
  h1?: string;
  h2?: string;
}

export const InfoBlockComponents = ({ Icon, h1, h2 }: InfoBlockProps) => {
  return (
    <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col items-center justify-center w-full h-full group">
      <div className="mb-6 w-full h-[50%] flex items-center justify-center">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {Icon && <Icon />}
        </div>
      </div>
      <div className="text-left flex flex-col gap-2 w-full">
        <p className="text-xl text-black font-bold">{h1 ?? "Default Title"}</p>
        <p className="text-base text-gray-500 font-medium leading-relaxed">{h2 ?? "Default Subtitle"}</p>
      </div>
    </div>
  )
}
