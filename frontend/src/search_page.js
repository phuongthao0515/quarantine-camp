import React from "react";
import search from "./search_page.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const PatientInfo = ({ searchReal, searchResult, setSearch }) => {
  const [page, setPage] = useState(1);
  const pageNums = Math.ceil(searchResult.length / 10);

  const pageResult = searchResult.slice(page * 10 - 10, page * 10);

  return (
    <div className={search.container}>
      <div className={search.patient_info}>
        {/* Main Content Section */}
        <div className={search.main_content}>
          <h1>Patient Information</h1>
          <div className={search.search_section}>
            <input
              type="text"
              placeholder="Search"
              className={search.search_bar}
              value={searchReal}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to={"/new"} style={{ textDecoration: "none" }}>
              <button className={search.add_patient_button}>
                + New Patient
              </button>
            </Link>
          </div>
          <table className={search.patient_table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Patient Number</th>
                <th>Patient Name</th>
                <th>Phone</th>
                <th>Comorbidities</th>
                <th>Testing Details</th>
                <th>Report</th>
              </tr>
            </thead>
            <tbody>
              {pageResult.map((patient, index) => (
                <tr key={patient.PNUMBER}>
                  <td>{(page - 1) * 10 + index + 1}</td>
                  <td>{patient.PNUMBER}</td>
                  <td>{patient.fullname}</td>
                  <td>{patient.PHONE}</td>
                  <td>
                    <Link
                      to={`/commobidity/${patient.PNUMBER}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button className={search.icon_button}>📋</button>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/test/${patient.PNUMBER}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button className={search.icon_button}>ℹ️</button>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/report/${patient.PNUMBER}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button className={search.icon_button}>📄</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={search.pagination}>
            <button
              className={search.pagination_button}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            {Array.from({ length: pageNums }, (_, i) => i + 1).map((each) => (
              <button
                key={each}
                className={`${search.pagination_button} ${
                  page === each ? search.active : ""
                }`}
                onClick={() => setPage(each)}
              >
                {each}
              </button>
            ))}
            <button
              className={search.pagination_button}
              onClick={() => setPage(page + 1)}
              disabled={page === pageNums}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
