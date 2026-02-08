import { LinkedIn } from "../../icons/linkedInIcon"
import { GitHubIcon } from "../../icons/githubIcon"
import { XIcon } from "../../icons/xIcon"
import { useNavigate, useLocation } from "react-router-dom"
import { UserIcon } from "../../icons/useIcon"
import { useState, useEffect } from "react"
import { useUser } from "../../context/UserContext"

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  async function fetchUser() {
    const user = useUser();
    setUsername(user.username);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate('/');
  };

  return (
    <div className="w-full py-4 fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="flex flex-row justify-between items-center mx-auto max-w-[80vw]">
        <div>
          <h2
            className="text-xl font-bold text-black cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => navigate('/')}
          >
            TradeX
          </h2>
        </div>
        <div className="flex flex-row gap-6 items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="nav-link font-medium">
            Dashboard
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/holdings'); }} className="nav-link font-medium">
            Portfolio
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/viewMarket'); }} className="nav-link font-medium">
            Market
          </a>
        </div>
        <div className="flex flex-row gap-2 justify-end items-center">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
          >
            <LinkedIn />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
          >
            <XIcon />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
          >
            <GitHubIcon />
          </a>

          {/* User Menu with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsUserMenuOpen(true)}
            onMouseLeave={() => setIsUserMenuOpen(false)}
          >
            <button className="text-[#999999] hover:text-black transition-colors duration-200 cursor-pointer p-1">
              <UserIcon />
            </button>

            {/* Dropdown Modal */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                {/* Arrow */}
                <div className="absolute -top-2 right-3 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45"></div>

                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{username || 'Guest'}</p>
                  <p className="text-xs text-gray-500">Welcome back!</p>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={() => navigate('/holdings')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    My Portfolio
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Dashboard
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
