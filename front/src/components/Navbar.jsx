import {useState} from 'react';
import { Settings, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const navigate = useNavigate();
     const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Problems", path: "/problems" },
    // { name: "Hiring", path: "/hiring" },
    // { name: "Devices", path: "/devices" },
    // { name: "Apps", path: "/apps" },
    // { name: "Salary", path: "/salary" },
    // { name: "Calendar", path: "/calendar" },
    { name: "Reviews", path: "/reviews" }
  ];


  const logout = () => {
    localStorage.removeItem("token"); // remove auth token
    navigate("/"); // go to login page
  };
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-transparent">
      <div className="text-2xl font-bold tracking-tight text-gray-800">NodeNotify <span className='text-yellow-400 '>.</span></div>
      
      <div className="flex items-center bg-gray-100/50 backdrop-blur-md rounded-full px-2 py-1 gap-1">
        {navItems.map((item) => (
  <button
    key={item.path}
    onClick={() => navigate(item.path)}
    className="px-4 py-1.5 rounded-full text-sm font-medium"
  >
    {item.name}
  </button>
))}
         
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium hover:bg-white/50">
          <Settings size={16} /> Setting
        </button>
        <div className="relative p-2 text-gray-600 bg-white rounded-full shadow-sm">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full border-2 border-white"></span>
        </div>
          <div className="relative">

          <div
            onClick={() => setOpen(!open)}
            className="w-10 h-10 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center border border-white shadow-sm"
          >
            <User size={24} className="text-gray-500" />
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg border">
              
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Logout
              </button>

            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;