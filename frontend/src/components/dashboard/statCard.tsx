
import { useNavigate } from "react-router-dom";

export function Stats() {
  const navigate = useNavigate();

  return (
    <div className="w-[55vw] max-w-[55vw]">
      <div className="flex flex-row gap-5 justify-between items-center ">
        <div className="flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors" onClick={() => navigate('/holdings')}>
          <h1 className="font-bold text-[64px]">
            $143K
          </h1>
          <h2 className="font-semibold text-[22px] text-[#999999]">
            Total Balance
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors" onClick={() => navigate('/viewMarket')}>
          <h1 className="font-bold text-[64px]">
            $143K
          </h1>
          <h2 className="font-semibold text-[22px] text-[#999999]">
            Market Value
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors" onClick={() => navigate('/viewStock')}>
          <h1 className="font-bold text-[64px]">
            $143K
          </h1>
          <h2 className="font-semibold text-[22px] text-[#999999]">
            Portfolio
          </h2>
        </div>
      </div>
    </div>
  )
}
