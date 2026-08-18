import {
  ChevronRight,
  Filter,
  Plus,
  Search,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { patients } from "../../data/patients";
import "./Patients.css";

function Patients() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        patient.name.toLowerCase().includes(search) ||
        patient.id.toLowerCase().includes(search) ||
        patient.phone.includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="patients-page">
      <div className="page-heading">
        <div>
          <p className="page-eyebrow">
            PATIENT MANAGEMENT
          </p>

          <h1>Patients</h1>

          <p>
            Manage patient records and access nursing information.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => alert("Patient registration will be added next.")}
        >
          <Plus size={18} />
          Add Patient
        </button>
      </div>

      <div className="patient-toolbar">
        <div className="patient-search">
          <Search size={18} />

          <input
            type="search"
            placeholder="Search by name, medical record number, or phone..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <div className="patient-filter">
          <Filter size={17} />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="All">All patients</option>
            <option value="Active">Active</option>
            <option value="Discharged">Discharged</option>
          </select>
        </div>
      </div>

      <div className="patient-summary">
        <div>
          <strong>{filteredPatients.length}</strong>
          <span>patients shown</span>
        </div>

        <span>
          Total registered: {patients.length}
        </span>
      </div>

      <div className="patients-table-card">
        <div className="patients-table-wrapper">
          <table className="patients-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>MRN</th>
                <th>Age / Gender</th>
                <th>Room / Bed</th>
                <th>Diagnosis</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  onClick={() =>
                    navigate(`/patients/${patient.id}`)
                  }
                >
                  <td>
                    <div className="patient-name-cell">
                      <div className="patient-list-avatar">
                        <UserRound size={17} />
                      </div>

                      <div>
                        <strong>{patient.name}</strong>
                        <span>{patient.phone}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="mrn">
                      {patient.id}
                    </span>
                  </td>

                  <td>
                    {patient.age} years
                    <span className="table-secondary">
                      {patient.gender}
                    </span>
                  </td>

                  <td>
                    {patient.room}
                    <span className="table-secondary">
                      Bed {patient.bed}
                    </span>
                  </td>

                  <td>
                    <span className="diagnosis">
                      {patient.diagnosis}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        patient.status === "Active"
                          ? "active"
                          : "discharged"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td>
                    <ChevronRight
                      size={18}
                      className="table-arrow"
                    />
                  </td>
                </tr>
              ))}

              {filteredPatients.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="empty-patients"
                  >
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Patients;