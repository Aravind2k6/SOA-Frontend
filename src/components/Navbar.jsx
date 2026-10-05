import { Bell, Search, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">

      <div className="search-box">
        <Search size={18} />
        <input placeholder="Search..." />
      </div>

      <div className="navbar-right">

        <button className="icon-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-info">
          <UserCircle size={34} />

          <div>
            <strong>Facility Manager</strong>
            <small>Administrator</small>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Navbar;