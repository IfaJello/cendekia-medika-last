import {
  ArrowLeft,
  ClipboardList,
  Clock3,
  HeartPulse,
  Save,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { patients } from "../../data/patients";
import { getCurrentUser } from "../../utils/auth";
import "./NursingAssessment.css";

function NursingAssessment() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const patient = patients.find(
    (item) => item.id === patientId
  );

  const currentUser = getCurrentUser();

  const [formData, setFormData] = useState({
    assessmentDate: getToday(),
    assessmentTime: getCurrentTime(),
    nurse: currentUser?.name || "Nurse Staff",

    subjectiveData: "",
    objectiveData: "",

    temperature: "",
    systolic: "",
    diastolic: "",
    pulse: "",
    respiratoryRate: "",
    oxygenSaturation: "",

    painScore: "0",

    generalCondition: "",
    consciousness: "",
    respiratory: "",
    cardiovascular: "",
    gastrointestinal: "",
    musculoskeletal: "",
    integumentary: "",
    neurological: "",
  });

  const [saved, setSaved] = useState(false);

  if (!patient) {
    return (
      <div className="assessment-not-found">
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

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSaveDraft = () => {
    const storageKey = `nursing_assessment_${patient.id}`;

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        patientId: patient.id,
        ...formData,
        savedAt: new Date().toISOString(),
        status: "draft",
      })
    );

    setSaved(true);
  };

  return (
    <div className="assessment-page">
      <button
        className="back-button"
        onClick={() =>
          navigate(`/patients/${patient.id}`)
        }
      >
        <ArrowLeft size={17} />
        Back to Patient
      </button>

      {/* Patient header */}

      <div className="assessment-patient-header">
        <div className="assessment-patient-avatar">
          <UserRound size={27} />
        </div>

        <div className="assessment-patient-info">
          <div>
            <h1>{patient.name}</h1>

            <span className="assessment-status">
              {patient.status}
            </span>
          </div>

          <p>
            {patient.id} · {patient.room} · Bed{" "}
            {patient.bed}
          </p>
        </div>
      </div>

      <div className="assessment-heading">
        <div>
          <p className="page-eyebrow">
            NURSING DOCUMENTATION
          </p>

          <h2>Nursing Assessment</h2>

          <p>
            Record the patient's current nursing assessment
            and clinical findings.
          </p>
        </div>

        {saved && (
          <div className="saved-indicator">
            Draft saved
          </div>
        )}
      </div>

      <div className="assessment-layout">
        <main>
          {/* Assessment information */}

          <section className="assessment-card">
            <SectionHeader
              icon={<ClipboardList size={18} />}
              title="Assessment Information"
              description="Record when and by whom this assessment was performed."
            />

            <div className="form-grid three-columns">
              <FormField label="Assessment Date">
                <input
                  type="date"
                  value={formData.assessmentDate}
                  onChange={(event) =>
                    updateField(
                      "assessmentDate",
                      event.target.value
                    )
                  }
                />
              </FormField>

              <FormField label="Assessment Time">
                <input
                  type="time"
                  value={formData.assessmentTime}
                  onChange={(event) =>
                    updateField(
                      "assessmentTime",
                      event.target.value
                    )
                  }
                />
              </FormField>

              <FormField label="Nurse">
                <input
                  type="text"
                  value={formData.nurse}
                  onChange={(event) =>
                    updateField(
                      "nurse",
                      event.target.value
                    )
                  }
                />
              </FormField>
            </div>
          </section>

          {/* Subjective */}

          <section className="assessment-card">
            <SectionHeader
              title="Subjective Data"
              description="Information reported by the patient or family."
            />

            <FormField
              label="Patient's Report"
              hint="Example: pain, symptoms, complaints, concerns, or statements from the patient."
            >
              <textarea
                rows="5"
                placeholder="Enter the patient's subjective information..."
                value={formData.subjectiveData}
                onChange={(event) =>
                  updateField(
                    "subjectiveData",
                    event.target.value
                  )
                }
              />
            </FormField>
          </section>

          {/* Objective */}

          <section className="assessment-card">
            <SectionHeader
              title="Objective Data"
              description="Observable and measurable clinical findings."
            />

            <FormField
              label="Clinical Observations"
              hint="Record relevant objective findings from your assessment."
            >
              <textarea
                rows="5"
                placeholder="Enter objective findings..."
                value={formData.objectiveData}
                onChange={(event) =>
                  updateField(
                    "objectiveData",
                    event.target.value
                  )
                }
              />
            </FormField>
          </section>

          {/* Vital signs */}

          <section className="assessment-card">
            <SectionHeader
              icon={<HeartPulse size={18} />}
              title="Vital Signs"
              description="Record the patient's current vital signs."
            />

            <div className="form-grid three-columns">
              <FormField
                label="Temperature"
                unit="°C"
              >
                <input
                  type="number"
                  step="0.1"
                  placeholder="36.8"
                  value={formData.temperature}
                  onChange={(event) =>
                    updateField(
                      "temperature",
                      event.target.value
                    )
                  }
                />
              </FormField>

              <FormField label="Blood Pressure">
                <div className="input-pair">
                  <input
                    type="number"
                    placeholder="120"
                    aria-label="Systolic blood pressure"
                    value={formData.systolic}
                    onChange={(event) =>
                      updateField(
                        "systolic",
                        event.target.value
                      )
                    }
                  />

                  <span>/</span>

                  <input
                    type="number"
                    placeholder="80"
                    aria-label="Diastolic blood pressure"
                    value={formData.diastolic}
                    onChange={(event) =>
                      updateField(
                        "diastolic",
                        event.target.value
                      )
                    }
                  />

                  <small>mmHg</small>
                </div>
              </FormField>

              <FormField
                label="Pulse"
                unit="bpm"
              >
                <input
                  type="number"
                  placeholder="82"
                  value={formData.pulse}
                  onChange={(event) =>
                    updateField(
                      "pulse",
                      event.target.value
                    )
                  }
                />
              </FormField>

              <FormField
                label="Respiratory Rate"
                unit="/min"
              >
                <input
                  type="number"
                  placeholder="18"
                  value={formData.respiratoryRate}
                  onChange={(event) =>
                    updateField(
                      "respiratoryRate",
                      event.target.value
                    )
                  }
                />
              </FormField>

              <FormField
                label="Oxygen Saturation"
                unit="%"
              >
                <input
                  type="number"
                  placeholder="98"
                  value={formData.oxygenSaturation}
                  onChange={(event) =>
                    updateField(
                      "oxygenSaturation",
                      event.target.value
                    )
                  }
                />
              </FormField>
            </div>
          </section>

          {/* Pain */}

          <section className="assessment-card">
            <SectionHeader
              title="Pain Assessment"
              description="Record the patient's reported pain intensity."
            />

            <div className="pain-field">
              <div className="pain-score-display">
                <strong>{formData.painScore}</strong>
                <span>/ 10</span>
              </div>

              <input
                className="pain-range"
                type="range"
                min="0"
                max="10"
                step="1"
                value={formData.painScore}
                onChange={(event) =>
                  updateField(
                    "painScore",
                    event.target.value
                  )
                }
              />

              <div className="pain-scale">
                <span>0 — No pain</span>
                <span>10 — Worst pain</span>
              </div>
            </div>
          </section>

          {/* Physical assessment */}

          <section className="assessment-card">
            <SectionHeader
              title="Physical Assessment"
              description="Record relevant findings from the physical assessment."
            />

            <div className="form-grid two-columns">
              <FormField label="General Condition">
                <select
                  value={formData.generalCondition}
                  onChange={(event) =>
                    updateField(
                      "generalCondition",
                      event.target.value
                    )
                  }
                >
                  <option value="">
                    Select condition
                  </option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </FormField>

              <FormField label="Level of Consciousness">
                <select
                  value={formData.consciousness}
                  onChange={(event) =>
                    updateField(
                      "consciousness",
                      event.target.value
                    )
                  }
                >
                  <option value="">
                    Select level
                  </option>
                  <option value="Alert">Alert</option>
                  <option value="Drowsy">Drowsy</option>
                  <option value="Confused">Confused</option>
                  <option value="Unresponsive">
                    Unresponsive
                  </option>
                </select>
              </FormField>

              <FormField label="Respiratory">
                <textarea
                  rows="3"
                  placeholder="Respiratory findings..."
                  value={formData.respiratory}
                  onChange={(event) =>
                    updateField(
                      "respiratory",
                      event.target.value
                    )
                  }
                />
              </FormField>

              <FormField label="Cardiovascular">
                <textarea
                  rows="3"
                  placeholder="Cardiovascular findings..."
                  value={formData.cardiovascular}
                  onChange={(event) =>
                    updateField(
                      "cardiovascular",
                      event.target.value
                    )
                  }
                />
              </FormField>

              <FormField label="Gastrointestinal">
                <textarea
                  rows="3"
                  placeholder="Gastrointestinal findings..."
                  value={formData.gastrointestinal}
                  onChange={(event) =>
                    updateField(
                      "gastrointestinal",
                      event.target.value
                    )
                  }
                />
              </FormField>

              <FormField label="Musculoskeletal">
                <textarea
                  rows="3"
                  placeholder="Musculoskeletal findings..."
                  value={formData.musculoskeletal}
                  onChange={(event) =>
                    updateField(
                      "musculoskeletal",
                      event.target.value
                    )
                  }
                />
              </FormField>

              <FormField label="Integumentary">
                <textarea
                  rows="3"
                  placeholder="Skin and integumentary findings..."
                  value={formData.integumentary}
                  onChange={(event) =>
                    updateField(
                      "integumentary",
                      event.target.value
                    )
                  }
                />
              </FormField>

              <FormField label="Neurological">
                <textarea
                  rows="3"
                  placeholder="Neurological findings..."
                  value={formData.neurological}
                  onChange={(event) =>
                    updateField(
                      "neurological",
                      event.target.value
                    )
                  }
                />
              </FormField>
            </div>
          </section>
        </main>

        {/* Summary */}

        <aside className="assessment-sidebar">
          <section className="assessment-summary-card">
            <span className="summary-label">
              PATIENT
            </span>

            <div className="summary-patient">
              <div className="summary-avatar">
                <UserRound size={18} />
              </div>

              <div>
                <strong>{patient.name}</strong>
                <span>{patient.id}</span>
              </div>
            </div>

            <div className="summary-divider" />

            <SummaryItem
              label="Room"
              value={`${patient.room} · Bed ${patient.bed}`}
            />

            <SummaryItem
              label="Diagnosis"
              value={patient.diagnosis}
            />

            <SummaryItem
              label="Assessment"
              value={`${formData.assessmentDate} ${formData.assessmentTime}`}
              icon={<Clock3 size={13} />}
            />
          </section>

          <section className="assessment-sidebar-note">
            <span>DOCUMENTATION STATUS</span>

            <strong>
              {saved ? "Draft saved" : "Not saved"}
            </strong>

            <p>
              Save your assessment as a draft before
              completing the nursing documentation.
            </p>
          </section>
        </aside>
      </div>

      {/* Bottom actions */}

      <div className="assessment-actions">
        <button
          className="secondary-button"
          onClick={() =>
            navigate(`/patients/${patient.id}`)
          }
        >
          Cancel
        </button>

        <button
          className="save-draft-button"
          onClick={handleSaveDraft}
        >
          <Save size={17} />
          Save Draft
        </button>

        <button
          className="complete-button"
          onClick={() =>
            alert(
              "Assessment completion will be connected after the nursing workflow is finalized."
            )
          }
        >
          Complete Assessment
        </button>
      </div>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="assessment-section-header">
      <div className="section-header-icon">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function FormField({
  label,
  hint,
  unit,
  children,
}) {
  return (
    <div className="form-field">
      <label>{label}</label>

      <div className="field-control">
        {children}

        {unit && (
          <span className="field-unit">
            {unit}
          </span>
        )}
      </div>

      {hint && <small>{hint}</small>}
    </div>
  );
}

function SummaryItem({
  label,
  value,
  icon,
}) {
  return (
    <div className="summary-item">
      <span>{label}</span>

      <strong>
        {icon}
        {value}
      </strong>
    </div>
  );
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getCurrentTime() {
  return new Date().toTimeString().slice(0, 5);
}

export default NursingAssessment;