import { useState } from "react";

import {
  sdkiCategories,
  sdkiDiagnoses,
} from "../../data/nursing/sdki";

import "./DiagnosisSelector.css";


function DiagnosisSelector({
  onSelect
}) {


  const [selectedCategory, setSelectedCategory] =
    useState(null);


  const [selectedSubcategory, setSelectedSubcategory] =
    useState(null);



  const filteredDiagnoses =
    sdkiDiagnoses.filter(
      (item) =>
        item.category === selectedCategory &&
        item.subcategory === selectedSubcategory
    );





  const chooseCategory = (category) => {

    setSelectedCategory(category);

    setSelectedSubcategory(null);

  };





  const chooseSubcategory = (subcategory) => {

    setSelectedSubcategory(subcategory);

  };





  return (

    <div className="diagnosis-selector">


      <section>

        <h4>
          1. Select Category
        </h4>


        <div className="selector-grid">


          {
            sdkiCategories.map(
              (category)=>(

                <button

                  key={category.id}

                  className={
                    selectedCategory?.id === category.id
                    ?
                    "selector-button active"
                    :
                    "selector-button"
                  }


                  onClick={() =>
                    chooseCategory(category)
                  }

                >

                  {category.name}

                </button>

              )

            )

          }


        </div>


      </section>






      {
        selectedCategory && (

          <section>

            <h4>
              2. Select Subcategory
            </h4>



            <div className="selector-grid">


              {
                selectedCategory.subcategories.map(
                  (subcategory)=>(

                    <button

                      key={subcategory.id}

                      className={
                        selectedSubcategory?.id === subcategory.id
                        ?
                        "selector-button active"
                        :
                        "selector-button"
                      }


                      onClick={() =>
                        chooseSubcategory(
                          subcategory
                        )
                      }

                    >

                      {subcategory.name}

                    </button>

                  )

                )

              }


            </div>


          </section>

        )
      }








      {
        selectedSubcategory && (

          <section>

            <h4>
              3. Select Diagnosis
            </h4>


            <div className="diagnosis-list">


              {
                filteredDiagnoses.length === 0 && (

                  <p>
                    No diagnosis available yet.
                  </p>

                )
              }





              {
                filteredDiagnoses.map(
                  (diagnosis)=>(

                    <button

                      key={diagnosis.id}

                      className="diagnosis-option"

                      onClick={() =>
                        onSelect(diagnosis)
                      }

                    >

                      <strong>
                        {diagnosis.id}
                      </strong>


                      <span>
                        {diagnosis.name}
                      </span>


                    </button>


                  )

                )

              }


            </div>


          </section>

        )
      }



    </div>

  );

}


export default DiagnosisSelector;