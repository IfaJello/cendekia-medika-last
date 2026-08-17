import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-search">
        <Search size={19} />
        <input
          type="text"
          placeholder="Search patients, records..."
        />
      </div>

      <div className="topbar-actions">
        <button className="icon-button" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">NS</div>

          <div className="user-info">
            <strong>Nurse Staff</strong>
            <span>Registered Nurse</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;