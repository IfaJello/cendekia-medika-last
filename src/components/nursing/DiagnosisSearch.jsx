import { Search } from "lucide-react";
import "./DiagnosisSearch.css";


function DiagnosisSearch({
  diagnoses,
  search,
  setSearch,
  onSelect
}) {

  const filteredDiagnoses = diagnoses.filter((item) => {

    const keyword = search.toLowerCase();

    return (
      item.name
        .toLowerCase()
        .includes(keyword) ||

      item.code
        .toLowerCase()
        .includes(keyword) ||

      item.domain
        .toLowerCase()
        .includes(keyword)
    );

  });


  return (
    <div className="diagnosis-search">

      <div className="search-box">

        <Search size={17}/>

        <input
          type="text"
          placeholder="Search SDKI diagnosis..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>


      <div className="diagnosis-results">

        {
          filteredDiagnoses.length === 0 ?

          (
            <p className="empty-result">
              No diagnosis found.
            </p>
          )

          :

          filteredDiagnoses.map((item)=>(
            
            <button
              key={item.code}
              className="diagnosis-result-card"
              onClick={()=>onSelect(item)}
            >

              <div>

                <strong>
                  {item.name}
                </strong>

                <span>
                  {item.code}
                </span>

              </div>


              <small>
                {item.domain}
              </small>

            </button>

          ))

        }

      </div>

    </div>
  );
}


export default DiagnosisSearch;