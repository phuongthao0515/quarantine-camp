import React from 'react';
import styles from './report.module.css';
import logo from './component/logo covide-19.png';
import Header from './header.js';

const PatientReport = () => {
  return (
    <div className={styles.container}>
      <Header logo = {logo}/>

      <main className={styles.main}>
        <h1>Patient Report</h1>

        {/* Demographic Information Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Demographic Information</h2>
          <div className={styles.formGrid}>
            <div>
              <label>Patient Number</label>
              <input type="text" value="Trần Minh Hiếu" readOnly />
            </div>
            <div>
              <label>Gender</label>
              <select>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label>PID</label>
              <input type="text" value="10000" readOnly />
            </div>
            <div>
              <label>Risk Level</label>
              <select>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label>Full Name</label>
              <input type="text" value="Trần Minh Hiếu" readOnly />
            </div>
            <div>
              <label>Address</label>
              <input type="text" value="268 Lý Thường Kiệt, Quận 10, TPHCM" readOnly  />
            </div>
            <div>
              <label>Phone</label>
              <input type="text" value="0909678455" readOnly  />
            </div>
          </div>
        </section>

        {/* Testing Information Section */}
        <section className={styles.section}>
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
                <th>PCR Test CT Value</th>
                <th>SPO2</th>
              </tr>
            </thead>
            <tbody>
              {/* Data Rows */}
              <tr>
                <td>10000001</td>
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
        </section>

        {/* Symptom Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Symptom</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Serious Level</th>
              </tr>
            </thead>
            <tbody>
              {/* Data Rows */}
              <tr>
                <td>Trần Minh Hiếu</td>
                <td>20.11.2024</td>
                <td>22.11.2024</td>
                <td>2</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Comorbidity Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Comorbidity</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Patient Number</th>
                <th>Comorbidity Name</th>
              </tr>
            </thead>
            <tbody>
              {/* Data Rows */}
              <tr>
                <td>10000001</td>
                <td>Obesity</td>
              </tr>
            </tbody>
          </table>
        </section>

        <button className={styles.backButton}>BACK TO MAIN</button>
      </main>
    </div>
  );
};

export default PatientReport;
