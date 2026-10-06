import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../Services/authService";

function Profile() {
  const user = getCurrentUser();
  const isManager = user?.role === "manager";
  const name = user?.name || "GridPulse User";
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="page-content">

          <div className="page-heading">
            <div>
              <h1>Profile</h1>
              <p>Manage your account information.</p>
            </div>
          </div>

          <div className="profile-card">

            <div className="profile-avatar">
              {name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
            </div>

            <h2>{name}</h2>

            <p>{user?.email || ""}</p>

            <hr />

            <div className="profile-info">

              <div>
                <span>Role</span>
                <strong>{isManager ? "Facility Manager" : "Portal User"}</strong>
              </div>

              <div>
                <span>Account Status</span>
                <strong className="online">Active</strong>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;
