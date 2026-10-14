import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardCheck,
  Brain,
  Lightbulb,
  History,
  HeartPulse,
  LifeBuoy,
  User,
  Settings,
  LogOut,
  MessageCircle
} from "lucide-react";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Assessment", icon: ClipboardCheck, path: "/assessment" },
  { label: "My Analysis", icon: Brain, path: "/analysis" },
  { label: "Recommendations", icon: Lightbulb, path: "/recommendations" },
  { label: "History", icon: History, path: "/history" },
  { label: "Wellness Guide", icon: HeartPulse, path: "/wellness" },
  { label: "Support", icon: LifeBuoy, path: "/support" },
  {
    label: "AI Assistant",
    path: "/chatbot",
    icon: MessageCircle,
  }
];

const bottomMenu = [
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-slate-200 bg-white px-4 py-6">
      <div className="mb-8 px-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <HeartPulse size={22} />
          </div>

          <div>
            <h1 className="font-bold text-slate-900">
              MindWell
            </h1>
            <p className="text-xs text-slate-500">
              Mental Health Predictor
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={19} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 pt-3">
        {bottomMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={19} />
              {item.label}
            </NavLink>
          );
        })}

        <button
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;