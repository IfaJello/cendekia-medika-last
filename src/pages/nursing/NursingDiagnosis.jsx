import {
  ArrowLeft,
  ClipboardCheck,
  Save,
  UserRound,
} from "lucide-react";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { patients } from "../../data/patients";

import {
  sdkiDiagnoses,
} from "../../data/nursing/sdki";

import DiagnosisSelector from "../../components/nursing/DiagnosisSelector";

import "./NursingDiagnosis.css";


function NursingDiagnosis() {

  const navigate = useNavigate();

  const { patientId } = useParams();


  const patient = patients.find(
    (item) => item.id === patientId
  );


  const [selectedDiagnosis, setSelectedDiagnosis] =
    useState(null);


  const [relatedFactors, setRelatedFactors] =
    useState("");


  const [characteristics, setCharacteristics] =
    useState([]);


  const [saved, setSaved] =
    useState(false);



  const diagnosis = selectedDiagnosis;



  if (!patient) {

    return (

      <div className="patient-not-found">

        <h2>
          Patient not found
        </h2>


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





  const handleDiagnosisSelect = (item) => {


    setSelectedDiagnosis(item);



    setRelatedFactors(

      item.causes?.join(", ")

      ||

      ""

    );



    setCharacteristics([

      ...(item.symptoms?.major || []),

      ...(item.symptoms?.minor || [])

    ]);



    setSaved(false);

  };






  const toggleCharacteristic = (item) => {


    setCharacteristics((current) =>

      current.includes(item)

        ?

        current.filter(
          (value) => value !== item
        )

        :

        [
          ...current,
          item
        ]

    );


    setSaved(false);

  };






  const saveDiagnosis = () => {


    const diagnosisData = {


      patientId: patient.id,


      sdkI: diagnosis,


      relatedFactors,


      definingCharacteristics:
        characteristics,


      status:
        "active",


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
            SDKI based nursing diagnosis documentation.
          </p>


        </div>


      </div>







      <div className="diagnosis-layout">



        <main>




          <section className="diagnosis-card">


            <SectionTitle

              icon={
                <ClipboardCheck size={18}/>
              }

              title="SDKI Diagnosis"

              description="Search and select nursing diagnosis."

            />



            <DiagnosisSelector

              onSelect={handleDiagnosisSelect}

            />





            {
              diagnosis && (

                <div className="diagnosis-info">


                  <strong>

                    {diagnosis.id}

                    {" - "}

                    {diagnosis.name}

                  </strong>



                  <p>

                    {diagnosis.definition}

                  </p>


                </div>

              )

            }


          </section>








          <section className="diagnosis-card">


            <SectionTitle

              title="Related Factors"

              description="Etiology or contributing factors."

            />



            <textarea

              rows="4"

              value={relatedFactors}

              onChange={(e)=>

                setRelatedFactors(
                  e.target.value
                )

              }

            />


          </section>









          <section className="diagnosis-card">


            <SectionTitle

              title="Defining Characteristics"

              description="Signs and symptoms."

            />



            <div className="checkbox-list">


              {
                characteristics.map(

                  (item)=>(

                    <CheckItem

                      key={item}

                      label={item}

                      checked={true}

                      onClick={() =>
                        toggleCharacteristic(item)
                      }

                    />

                  )

                )

              }


            </div>



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




            <button

              className="save-button"

              onClick={saveDiagnosis}

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


      {
        icon &&

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
        ?
        "check-item checked"
        :
        "check-item"
      }


      onClick={onClick}

    >

      <span>
        ✓
      </span>


      {label}


    </button>

  );

}







export default NursingDiagnosis;