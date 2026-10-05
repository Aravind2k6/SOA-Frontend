import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {
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
              FM
            </div>

            <h2>Facility Manager</h2>

            <p>manager@gridpulse.com</p>

            <hr />

            <div className="profile-info">

              <div>
                <span>Role</span>
                <strong>Facility Manager</strong>
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