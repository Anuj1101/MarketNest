import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingBagIcon, UserCircleIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Squares2X2Icon className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-black tracking-tighter">MarketNest</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/marketplace" className="text-sm font-medium text-gray-600 hover:text-indigo-600">Shop</Link>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button onClick={() => navigate("/dashboard")} className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                <UserCircleIcon className="h-6 w-6" />
                Dashboard
              </button>
              <button onClick={logout} className="text-sm font-bold text-red-500">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-gray-700">Login</Link>
              <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;