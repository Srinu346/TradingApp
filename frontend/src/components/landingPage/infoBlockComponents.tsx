interface InfoBlockProps {
  Icon?: React.ComponentType; // React component for icons
  h1?: string;
  h2?: string;
}

export const InfoBlockComponents = ({ Icon, h1, h2 }: InfoBlockProps) => {
  return (
    <div className="bg-[#f5f5f5] p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-full h-full">
      <div className="mb-4 w-full h-[50%] flex items-center justify-center">
        {Icon && <Icon />} {/* Render icon if passed */}
      </div>
      <div className="text-left flex flex-col gap-2 w-full">
        <p className="text-lg text-[#999999] font-semibold">{h1 ?? "Default Title"}</p>
        <p className="text-xl text-black font-semibold">{h2 ?? "Default Subtitle"}</p>
      </div>
    </div>
  )
}
