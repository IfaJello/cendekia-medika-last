import logo from "../../assets/images/cendekia-medika-logo.png";
import {
  BarChart3,
  ClipboardList,
  FileText,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../utils/auth";

function Sidebar() {
  const navigate = useNavigate();

  const navigation = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      label: "Patients",
      icon: Users,
      path: "/patients",
    },
    {
      label: "Nursing Assessment",
      icon: Stethoscope,
      path: "/assessments",
    },
    {
      label: "Nursing Care",
      icon: HeartPulse,
      path: "/nursing-care",
    },
    {
      label: "Documentation",
      icon: FileText,
      path: "/documentation",
    },
    {
      label: "Reports",
      icon: BarChart3,
      path: "/reports",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <img
            src={logo}
            alt="Cendekia Medika"
          />
        </div>

        <div>
          <strong>Cendekia Medika</strong>
          <span>Nursing Information System</span>
        </div>
      </div>

      <nav className="sidebar-navigation">
        <p className="navigation-label">
          MAIN MENU
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <p className="navigation-label settings-label">
          SYSTEM
        </p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button
          className="logout-button"
          onClick={() => {
            logoutUser();
            navigate("/");
          }}
        >
          <LogOut size={19} />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;