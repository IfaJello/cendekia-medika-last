import {
  ArrowLeft,
  ClipboardCheck,
  HeartPulse,
  Save,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { patients } from "../../data/patients";
import {
  sdkid,
  slki,
  siki
} from "../../data/nursing-standard";

console.log("SDKI:", sdkid);
console.log("SLKI:", slki);
console.log("SIKI:", siki);

import "./NursingDiagnosis.css";


function NursingDiagnosis() {
  const navigate = useNavigate();
  const { patientId } = useParams();

  const patient = patients.find(
    (item) => item.id === patientId
  );

  const [selectedDiagnosis, setSelectedDiagnosis] =
    useState("");

  const [relatedFactors, setRelatedFactors] =
    useState("");

  const [characteristics, setCharacteristics] =
    useState([]);

  const [saved, setSaved] = useState(false);


  const diagnosis =
    sdkid.find(
      (item) =>
        item.name === selectedDiagnosis
    );


  const selectedSLKI =
    slki.find(
      (item) =>
        item.diagnosis === selectedDiagnosis
    );


  const selectedSIKI =
    siki.find(
      (item) =>
        item.diagnosis === selectedDiagnosis
    );


  if (!patient) {
    return (
      <div className="patient-not-found">
        <h2>Patient not found</h2>

        <button
          className="primary-button"
          onClick={() =>
            navigate("/patients")
          }
        >
          Back to Patients
        </button>
      </div>
    );
  }


  const toggleCharacteristic = (item) => {
    setCharacteristics((current) =>
      current.includes(item)
        ? current.filter(
            (value) => value !== item
          )
        : [
            ...current,
            item
          ]
    );

    setSaved(false);
  };


  const saveDiagnosis = () => {

    const diagnosisData = {
      patientId: patient.id,

      sdkid: diagnosis,

      relatedFactors,

      definingCharacteristics:
        characteristics,

      slki:
        selectedSLKI,

      siki:
        selectedSIKI,

      status: "active",

      createdAt:
        new Date().toISOString()
    };


    localStorage.setItem(
      `nursing_diagnosis_${patient.id}`,
      JSON.stringify(
        diagnosisData
      )
    );


    setSaved(true);
  };


  return (
    <div className="diagnosis-page">

      <button
        className="back-button"
        onClick={() =>
          navigate(
            `/patients/${patient.id}`
          )
        }
      >
        <ArrowLeft size={17}/>
        Back to Patient
      </button>


      <div className="diagnosis-header">

        <div className="patient-mini">

          <div className="patient-mini-avatar">
            <UserRound size={25}/>
          </div>


          <div>
            <h1>
              {patient.name}
            </h1>

            <p>
              {patient.id}
              {" · "}
              {patient.room}
              {" · Bed "}
              {patient.bed}
            </p>
          </div>

        </div>


        <div>
          <span className="page-label">
            NURSING PROCESS
          </span>

          <h2>
            Nursing Diagnosis
          </h2>

          <p>
            SDKI based nursing diagnosis
            documentation.
          </p>
        </div>

      </div>



      <div className="diagnosis-layout">


        <main>


          <section className="diagnosis-card">

            <SectionTitle
              icon={<ClipboardCheck size={18}/>}
              title="SDKI Diagnosis"
              description="Select the patient's nursing diagnosis."
            />


            <label>
              Nursing Diagnosis
            </label>


            <select
              value={selectedDiagnosis}
              onChange={(event)=> {
                setSelectedDiagnosis(
                  event.target.value
                );

                setSaved(false);
              }}
            >

              <option value="">
                Select diagnosis
              </option>


              {sdkid.map((item)=>(
                <option
                  key={item.code}
                  value={item.name}
                >
                  {item.code}
                  {" - "}
                  {item.name}
                </option>
              ))}

            </select>



            {diagnosis && (

              <div className="diagnosis-info">

                <strong>
                  {diagnosis.name}
                </strong>

                <p>
                  {diagnosis.definition}
                </p>

              </div>

            )}

          </section>





          <section className="diagnosis-card">

            <SectionTitle
              title="Related Factors"
              description="Etiology or contributing factors."
            />


            <textarea
              rows="4"
              placeholder="Example: tissue injury, physiological factors..."
              value={relatedFactors}
              onChange={(event)=>
                setRelatedFactors(
                  event.target.value
                )
              }
            />

          </section>





          <section className="diagnosis-card">

            <SectionTitle
              title="Defining Characteristics"
              description="Signs and symptoms supporting the diagnosis."
            />



            <div className="checkbox-list">

              <CheckItem
                label="Reports pain"
                checked={
                  characteristics.includes(
                    "Reports pain"
                  )
                }
                onClick={() =>
                  toggleCharacteristic(
                    "Reports pain"
                  )
                }
              />


              <CheckItem
                label="Increased pain scale"
                checked={
                  characteristics.includes(
                    "Increased pain scale"
                  )
                }
                onClick={() =>
                  toggleCharacteristic(
                    "Increased pain scale"
                  )
                }
              />


              <CheckItem
                label="Restlessness"
                checked={
                  characteristics.includes(
                    "Restlessness"
                  )
                }
                onClick={() =>
                  toggleCharacteristic(
                    "Restlessness"
                  )
                }
              />

            </div>

          </section>






          <section className="diagnosis-card">

            <SectionTitle
              icon={<HeartPulse size={18}/>}
              title="SLKI Expected Outcome"
              description="Expected nursing outcomes."
            />


            {selectedSLKI ? (

              <div className="standard-box">

                <strong>
                  {selectedSLKI.outcomes[0].code}
                  {" - "}
                  {selectedSLKI.outcomes[0].name}
                </strong>


                <ul>

                  {selectedSLKI.outcomes[0]
                    .indicators
                    .map((item)=>(
                      <li key={item}>
                        {item}
                      </li>
                    ))}

                </ul>

              </div>

            ) : (

              <p className="empty-text">
                Select diagnosis to display SLKI.
              </p>

            )}

          </section>






          <section className="diagnosis-card">

            <SectionTitle
              title="SIKI Intervention"
              description="Recommended nursing intervention."
            />


            {selectedSIKI ? (

              <div className="standard-box">

                <strong>
                  {selectedSIKI.interventions[0].code}
                  {" - "}
                  {selectedSIKI.interventions[0].name}
                </strong>


                <ul>

                {selectedSIKI.interventions[0]
                  .actions
                  .map((item)=>(
                    <li key={item}>
                      {item}
                    </li>
                  ))}

                </ul>

              </div>

            ) : (

              <p className="empty-text">
                Select diagnosis to display SIKI.
              </p>

            )}

          </section>


        </main>





        <aside>

          <section className="summary-card">

            <span>
              PATIENT
            </span>


            <h3>
              {patient.name}
            </h3>


            <p>
              {patient.diagnosis}
            </p>


            <hr/>


            <button
              className="save-button"
              onClick={
                saveDiagnosis
              }
            >

              <Save size={16}/>

              Save Diagnosis

            </button>


            {
              saved &&
              <small className="saved-text">
                Diagnosis saved
              </small>
            }


          </section>


        </aside>


      </div>

    </div>
  );
}





function SectionTitle({
  icon,
  title,
  description
}) {

  return (
    <div className="section-title">

      {icon &&
        <div className="section-icon">
          {icon}
        </div>
      }


      <div>

        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>

      </div>

    </div>
  );
}





function CheckItem({
  label,
  checked,
  onClick
}) {

  return (
    <button
      className={
        checked
        ? "check-item checked"
        : "check-item"
      }
      onClick={onClick}
    >

      <span>
        {checked ? "✓" : ""}
      </span>

      {label}

    </button>
  );
}




export default NursingDiagnosis;