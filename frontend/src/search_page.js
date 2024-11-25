import React from 'react';
import search from './search_page.module.css';
import Header from "./header.js";
import logo from './component/logo covide-19.png';

const PatientInfo = () => {
  return (
    <div className = {search.container}>
    <div className={search.patient_info}>
      {/* Header Section */}
      <Header logo = {logo}/>

      {/*Main Content Section*/}
      <div className={search.main_content}>
        <h1>Patient Information</h1>
        <div className={search.search_section}>
          <input type="text" placeholder="Search" className={search.search_bar} />
          <button className={search.add_patient_button}>+ New Patient</button>
        </div>
        <table className={search.patient_table}>
          <thead>
            <tr>
              <th>No</th>
              <th>PNumber</th>
              <th>Patient Name</th>
              <th>Phone</th>
              <th>Comorbidities</th>
              <th>Testing Details</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {Array(10).fill(0).map((_, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>1000000{index}</td>
                <td>Nguyen Van A</td>
                <td>0922 964 718</td>
                <td><button className={search.icon_button}>📋</button></td>
                <td><button className={search.icon_button}>ℹ️</button></td>
                <td><button className={search.icon_button}>📄</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={search.pagination}>
          <button className={search.pagination_button}>Previous</button>
          {[1, 2, 3, 4].map(page => (
            <button key={page} className={`pagination-button ${page === 1 ? 'active' : ''}`}>
              {page}
            </button>
          ))}
          <button className={search.pagination_button}>Next</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PatientInfo;
