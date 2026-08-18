import {
  Activity,
  ArrowUpRight,
  BedDouble,
  ClipboardCheck,
  UserRound,
  Users,
} from "lucide-react";
import "./Dashboard.css";

function Dashboard() {
  const statistics = [
    {
      title: "Total Patients",
      value: "128",
      change: "+12%",
      description: "from last month",
      icon: Users,
    },
    {
      title: "Active Patients",
      value: "84",
      change: "+8%",
      description: "from last week",
      icon: Activity,
    },
    {
      title: "Nursing Assessments",
      value: "56",
      change: "+14%",
      description: "this week",
      icon: ClipboardCheck,
    },
    {
      title: "Available Beds",
      value: "24",
      change: "18%",
      description: "of total capacity",
      icon: BedDouble,
    },
  ];

  return (
    <div className="dashboard">
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">
            OVERVIEW
          </p>

          <h1>Dashboard</h1>

          <p>
            Welcome back, Nurse Staff. Here's what's
            happening today.
          </p>
        </div>

        <div className="dashboard-date">
          Tuesday, August 18, 2026
        </div>
      </div>

      <section className="statistics-grid">
        {statistics.map((statistic) => {
          const Icon = statistic.icon;

          return (
            <div
              className="stat-card"
              key={statistic.title}
            >
              <div className="stat-card-top">
                <div className="stat-icon">
                  <Icon size={21} />
                </div>

                <button className="stat-action">
                  <ArrowUpRight size={17} />
                </button>
              </div>

              <p>{statistic.title}</p>

              <div className="stat-value">
                {statistic.value}
              </div>

              <div className="stat-change">
                <span>{statistic.change}</span>
                {statistic.description}
              </div>
            </div>
          );
        })}
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Recent Patients</h2>
              <p>Recently registered patients</p>
            </div>

            <button>View all</button>
          </div>

          <div className="patient-list">
            <div className="patient-row">
              <div className="patient-avatar">
                AS
              </div>

              <div className="patient-details">
                <strong>Andi Saputra</strong>
                <span>MRN-2026-00124</span>
              </div>

              <span className="patient-status">
                Active
              </span>
            </div>

            <div className="patient-row">
              <div className="patient-avatar">
                DW
              </div>

              <div className="patient-details">
                <strong>Dewi Wulandari</strong>
                <span>MRN-2026-00123</span>
              </div>

              <span className="patient-status">
                Active
              </span>
            </div>

            <div className="patient-row">
              <div className="patient-avatar">
                RP
              </div>

              <div className="patient-details">
                <strong>Rizky Pratama</strong>
                <span>MRN-2026-00121</span>
              </div>

              <span className="patient-status">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Today's Tasks</h2>
              <p>Your nursing activities</p>
            </div>
          </div>

          <div className="task-list">
            <div className="task-item">
              <div className="task-icon">
                <UserRound size={18} />
              </div>

              <div>
                <strong>Patient assessment</strong>
                <span>12 patients pending</span>
              </div>

              <span className="task-count">
                12
              </span>
            </div>

            <div className="task-item">
              <div className="task-icon">
                <ClipboardCheck size={18} />
              </div>

              <div>
                <strong>Care plan review</strong>
                <span>6 plans require review</span>
              </div>

              <span className="task-count">
                6
              </span>
            </div>

            <div className="task-item">
              <div className="task-icon">
                <Activity size={18} />
              </div>

              <div>
                <strong>Vital signs</strong>
                <span>8 measurements due</span>
              </div>

              <span className="task-count">
                8
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;