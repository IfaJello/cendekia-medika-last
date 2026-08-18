import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  FileText,
  HeartPulse,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { patients } from "../../data/patients";
import "./PatientProfile.css";

function PatientProfile() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const patient = patients.find(
    (item) => item.id === patientId
  );

  if (!patient) {
    return (
      <div className="patient-not-found">
        <h2>Patient not found</h2>
        <p>
          The requested patient record could not be found.
        </p>

        <button
          className="primary-button"
          onClick={() => navigate("/patients")}
        >
          Back to Patients
        </button>
      </div>
    );
  }

  return (
    <div className="patient-profile-page">
      <button
        className="back-button"
        onClick={() => navigate("/patients")}
      >
        <ArrowLeft size={17} />
        Back to Patients
      </button>

      <div className="patient-profile-header">
        <div className="patient-profile-main">
          <div className="patient-profile-avatar">
            <UserRound size={30} />
          </div>

          <div>
            <div className="patient-title-row">
              <h1>{patient.name}</h1>

              <span
                className={`status-badge ${
                  patient.status === "Active"
                    ? "active"
                    : "discharged"
                }`}
              >
                {patient.status}
              </span>
            </div>

            <p className="patient-mrn">
              {patient.id}
            </p>

            <p className="patient-diagnosis">
              {patient.diagnosis}
            </p>
          </div>
        </div>

        <div className="patient-location">
          <span>Current location</span>
          <strong>
            {patient.room} · Bed {patient.bed}
          </strong>
        </div>
      </div>

      <div className="patient-content-grid">
        <main>
          <section className="profile-card">
            <div className="profile-card-heading">
              <div>
                <h2>Patient Information</h2>
                <p>
                  Basic demographic and contact information.
                </p>
              </div>

              <UserRound size={19} />
            </div>

            <div className="information-grid">
              <InfoItem
                label="Full Name"
                value={patient.name}
              />

              <InfoItem
                label="Medical Record Number"
                value={patient.id}
              />

              <InfoItem
                label="Date of Birth"
                value={formatDate(patient.dateOfBirth)}
              />

              <InfoItem
                label="Age"
                value={`${patient.age} years`}
              />

              <InfoItem
                label="Gender"
                value={patient.gender}
              />

              <InfoItem
                label="Blood Type"
                value={patient.bloodType}
              />

              <InfoItem
                label="Phone"
                value={patient.phone}
              />

              <InfoItem
                label="NIK"
                value={patient.nik}
              />

              <InfoItem
                label="Address"
                value={patient.address}
                fullWidth
              />
            </div>
          </section>

          <section className="profile-card">
            <div className="profile-card-heading">
              <div>
                <h2>Admission Information</h2>
                <p>
                  Current admission and clinical information.
                </p>
              </div>

              <ClipboardList size={19} />
            </div>

            <div className="information-grid">
              <InfoItem
                label="Admission Date"
                value={formatDate(patient.admissionDate)}
              />

              <InfoItem
                label="Room"
                value={patient.room}
              />

              <InfoItem
                label="Bed"
                value={patient.bed}
              />

              <InfoItem
                label="Attending Doctor"
                value={patient.attendingDoctor}
              />

              <InfoItem
                label="Primary Diagnosis"
                value={patient.diagnosis}
                fullWidth
              />
            </div>
          </section>

          <section className="profile-card">
            <div className="profile-card-heading">
              <div>
                <h2>Nursing Information</h2>
                <p>
                  Nursing documentation and care activities.
                </p>
              </div>

              <HeartPulse size={19} />
            </div>

            <div className="nursing-actions">
            <button
                className="nursing-action"
                onClick={() =>
                navigate(
                    `/patients/${patient.id}/assessment`
                )
                }
            >
                <div className="nursing-action-icon">
                <ClipboardList size={19} />
                </div>

                <div>
                <strong>Nursing Assessment</strong>
                <span>
                    Record the patient's current assessment.
                </span>
                </div>
            </button>

            <button
                className="nursing-action"
                onClick={() =>
                navigate(
                `/patients/${patient.id}/diagnosis`
                )
                }
            >
                <div className="nursing-action-icon">
                <HeartPulse size={19} />
                </div>

                <div>
                <strong>Nursing Care Plan</strong>
                <span>
                    View and manage the nursing care plan.
                </span>
                </div>
            </button>

            <button
                className="nursing-action"
                onClick={() =>
                alert(
                    "Documentation will be added next."
                )
                }
            >
                <div className="nursing-action-icon">
                <FileText size={19} />
                </div>

                <div>
                <strong>Nursing Documentation</strong>
                <span>
                    Review nursing documentation and notes.
                </span>
                </div>
            </button>
            </div>
          </section>
        </main>

        <aside className="patient-profile-sidebar">
          <section className="profile-card quick-card">
            <h2>Quick Information</h2>

            <QuickItem
              icon={<CalendarDays size={17} />}
              label="Admission"
              value={formatDate(patient.admissionDate)}
            />

            <QuickItem
              icon={<MapPin size={17} />}
              label="Location"
              value={`${patient.room} · Bed ${patient.bed}`}
            />

            <QuickItem
              icon={<Phone size={17} />}
              label="Contact"
              value={patient.phone}
            />

            <QuickItem
              icon={<HeartPulse size={17} />}
              label="Blood Type"
              value={patient.bloodType}
            />
          </section>

          <section className="profile-card care-status-card">
            <span className="care-status-label">
              CURRENT CARE STATUS
            </span>

            <strong>
              Nursing care in progress
            </strong>

            <p>
              No nursing assessment has been documented
              yet.
            </p>

            <button
              onClick={() =>
                alert(
                  "Nursing assessment will be added next."
                )
              }
            >
              Start Assessment
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  fullWidth = false,
}) {
  return (
    <div
      className={`info-item ${
        fullWidth ? "full-width" : ""
      }`}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function QuickItem({ icon, label, value }) {
  return (
    <div className="quick-item">
      <div className="quick-item-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default PatientProfile;