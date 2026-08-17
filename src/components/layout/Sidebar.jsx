import {
  LayoutDashboard,
  Users,
  ClipboardList,
  HeartPulse,
  FileText,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Patients",
    icon: Users,
    path: "/patients",
  },
  {
    label: "Assessment",
    icon: ClipboardList,
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

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">CM</div>

        <div>
          <h1>Cendekia Medika</h1>
          <span>Nursing Information System</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-section-title">MAIN MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              href={item.path}
              className={`nav-item ${item.path === "/" ? "active" : ""}`}
              key={item.label}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </a>
          );
        })}

        <p className="nav-section-title settings-title">SYSTEM</p>

        <a href="/settings" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;