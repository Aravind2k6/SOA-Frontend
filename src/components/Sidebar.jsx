import {
  LayoutDashboard,
  Gauge,
  BarChart3,
  Bell,
  FileText,
  User,
  LogOut,
  Zap,
  UserRoundCheck,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../Services/authService";

function Sidebar() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Smart Meters",
      path: "/meters",
      icon: Gauge,
    },
    {
      name: "Usage Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Alerts",
      path: "/alerts",
      icon: Bell,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  if (currentUser?.role === "manager") {
    menuItems.push({ name: "Account Requests", path: "/manager/accounts", icon: UserRoundCheck });
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">
          <Zap size={24} />
        </div>

        <div>
          <h2>GridPulse</h2>
          <span>Energy Analytics</span>
        </div>
      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

      <button className="logout-button" onClick={handleLogout}>
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}

export default Sidebar;
