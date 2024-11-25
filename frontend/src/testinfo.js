import React from 'react';
import styles from './testinfo.module.css';
import Header from './header.js';
import logo from './component/logo covide-19.png';

const PatientTestingInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.patient_info}>
        {/* Header Section */}
        <Header logo={logo} />

        {/* Main Section */}
        <main>
          <h1 className={styles.pageTitle}>Patient Testing Information</h1>

          {/* Testing Information Table */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Testing Information</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Patient Number</th>
                  <th>Test ID</th>
                  <th>QT Result</th>
                  <th>QT CT Value</th>
                  <th>Respiratory Rate</th>
                  <th>PCR Test Result</th>
                  <th>PCR Test CT value</th>
                  <th>SPO2</th>
                </tr>
              </thead>
              <tbody>
                {/* Row with actual data */}
                <tr>
                  <td>1000000</td>
                  <td>00001</td>
                  <td>Positive</td>
                  <td>35</td>
                  <td>18</td>
                  <td>Positive</td>
                  <td>40</td>
                  <td>98%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientTestingInfo;
