import { useEffect, useState } from "react";
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const userName = currentUser?.name || "User";
  const firstLetter = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    navigate("/login");
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfile(false);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false);
  };

  const markNotificationsRead = () => {
    setHasNotifications(false);
  };

  return (
    <header className="relative flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">

      {/* Left */}
      <div>
        <p className="text-sm text-slate-500">
          Welcome back
        </p>

        <h2 className="font-semibold text-slate-900">
          {userName}
        </h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 md:flex">
          <Search
            size={17}
            className="text-slate-400"
          />

          <input
            placeholder="Search..."
            className="w-40 bg-transparent text-sm outline-none"
          />
        </div>

        {/* Notification */}
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            className="relative rounded-xl p-2 transition hover:bg-slate-100"
            title="Notifications"
          >
            <Bell
              size={20}
              className="text-slate-600"
            />

            {hasNotifications && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl">

              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <h3 className="font-semibold text-slate-900">
                  Notifications
                </h3>

                {hasNotifications && (
                  <button
                    onClick={markNotificationsRead}
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="p-4">
                {hasNotifications ? (
                  <div className="flex gap-3 rounded-xl bg-emerald-50 p-3">
                    <div className="mt-0.5 rounded-lg bg-emerald-100 p-2 text-emerald-600">
                      <Check size={16} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Assessment available
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Your latest wellness assessment is available to
                        review.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 text-center">
                    <Bell
                      size={24}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-2 text-sm text-slate-500">
                      You're all caught up.
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={handleProfileClick}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700 transition hover:bg-emerald-200"
            title="Profile"
          >
            {firstLetter}
          </button>

          {showProfile && (
            <div className="absolute right-0 top-12 z-50 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">

              {/* User info */}
              <div className="border-b border-slate-100 px-3 py-3">
                <p className="font-semibold text-slate-900">
                  {userName}
                </p>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {currentUser?.email || "User account"}
                </p>
              </div>

              {/* Profile */}
              <button
                onClick={() => {
                  setShowProfile(false);
                  navigate("/profile");
                }}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100"
              >
                <User size={17} />
                Profile
              </button>

              {/* Settings */}
              <button
                onClick={() => {
                  setShowProfile(false);
                  navigate("/settings");
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100"
              >
                <Settings size={17} />
                Settings
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50"
              >
                <LogOut size={17} />
                Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}

export default Topbar;