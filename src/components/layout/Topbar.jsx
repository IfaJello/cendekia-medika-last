import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

function Topbar({ onMenuClick }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>

        <div className="search-box">
          <Search size={18} />

          <input
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="topbar-right">
        <button
          className="notification-button"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <div className="user-menu">
          <div className="user-avatar">
            NS
          </div>

          <div className="user-info">
            <strong>Nurse Staff</strong>
            <span>Registered Nurse</span>
          </div>

          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default Topbar;