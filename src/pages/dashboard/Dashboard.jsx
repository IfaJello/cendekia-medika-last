function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <p className="page-eyebrow">OVERVIEW</p>

          <h1>Good morning, Nurse Staff</h1>

          <p>
            Here's what's happening with your nursing activities today.
          </p>
        </div>

        <button className="primary-button">
          + New Assessment
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Patients</span>
          <strong>128</strong>
          <small>+8 this month</small>
        </div>

        <div className="stat-card">
          <span>Today's Patients</span>
          <strong>24</strong>
          <small>6 require attention</small>
        </div>

        <div className="stat-card">
          <span>Pending Assessments</span>
          <strong>7</strong>
          <small>Need review</small>
        </div>

        <div className="stat-card">
          <span>Care Plans</span>
          <strong>42</strong>
          <small>Active care plans</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Recent Patients</h2>
              <p>Recently accessed patient records</p>
            </div>

            <button className="text-button">
              View all
            </button>
          </div>

          <div className="empty-state">
            <p>Patient data will appear here.</p>
          </div>
        </section>

        <section className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Today's Tasks</h2>
              <p>Your nursing activities</p>
            </div>
          </div>

          <div className="empty-state">
            <p>No pending tasks.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;