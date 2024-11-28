import React from "react";
import styles from "./report.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const PatientReport = ({
  test,
  setTest,
  patients,
  API_URL,
  Comorbidity,
  setcom,
}) => {
  const { Id } = useParams();

  const patient = patients.find((patient) => patient.PNUMBER.toString() === Id);
  const [symptoms, setSymptoms] = useState([]);
  // Fetch report data
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`${API_URL}/report/${Id}`);
        if (!response.ok) {
          throw new Error("Failed to Report information");
        }
        const data = await response.json();
        setcom(data.comorbidities);
        setSymptoms(data.symptoms);
        setTest(data.test_results);
        patient = data.patient_info;
      } catch (error) {
        console.error("Error fetching Report:", error);
      }
    };

    fetchReport();
  }, [Id]);
  return (
    <div className="container">
      <main className={styles.main}>
        <h1>Patient Report</h1>

        {/* Demographic Information Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Demographic Information</h2>
          <div className={styles.formGrid}>
            <div>
              <label>Patient Number</label>
              <input type="text" value={patient.PNUMBER} readOnly />
            </div>
            <div>
              <label>Gender</label>
              <input type="text" value={patient.gender} readOnly />
            </div>
            <div>
              <label>PID</label>
              <input type="text" value={patient.PID} readOnly />
            </div>
            <div>
              <label>Risk Level</label>
              <input type="text" value={patient.riskLevel} readOnly />
            </div>
            <div>
              <label>Full Name</label>
              <input type="text" value={patient.fullname} readOnly />
            </div>
            <div>
              <label>Address</label>
              <input type="text" value={patient.address} readOnly />
            </div>
            <div>
              <label>Phone</label>
              <input type="text" value={patient.PHONE} readOnly />
            </div>
          </div>
        </section>

        {/* Testing Information Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Testing Information</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Test ID</th>
                <th>Patient Number</th>
                <th>Quick Test Result</th>
                <th>Quick Test CT Value</th>
                <th>Respiratory Rate</th>
                <th>PCR Test Result</th>
                <th>PCR Test CT Value</th>
                <th>SPO2</th>
              </tr>
            </thead>
            <tbody>
              {test.length > 0 ? (
                test.map((each) => (
                  <tr>
                    <td>{each.Test_ID}</td>
                    <td>{each.PNUMBER}</td>
                    <td>{each.QT_result}</td>
                    <td>{each.QT_ct_value}</td>
                    <td>{each.Respiratory_rate}</td>
                    <td>{each.PCR_result}</td>
                    <td>{each.PCR_ct_value}</td>
                    <td>{each.SPO2}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No test data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Symptom Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Symptoms</h2>
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
              {symptoms.map((symptom, index) => (
                <tr key={index}>
                  <td>{symptom.SYMP_NAME}</td>
                  <td>{symptom.START_DATE}</td>
                  <td>{symptom.END_DATE || "Ongoing"}</td>
                  <td>{symptom.SERIOUS_LEVEL}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Comorbidity Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Comorbidity</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Comorbidity Name</th>
              </tr>
            </thead>
            <tbody>
              {/* Data Rows */}
              <tr>
                {Comorbidity.map((each) => (
                  <td>{each.COMORBIDITY_NAME}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </section>

        {/* Treatment Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Treatment</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Treatment ID</th>
                <th>Doctor ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Result</th>
                <th>Medicine</th>
              </tr>
            </thead>
            <tbody>
              {symptoms.map((treatment, index) => (
                <tr key={index}>
                  <td>{treatment.treatmentID}</td>
                  <td>{treatment.startDate}</td>
                  <td>{treatment.endDate}</td>
                  <td>{treatment.doctorID}</td>
                  <td>{treatment.result}</td>
                  <td>{treatment.medicine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <Link to={`/search`} style={{ textDecoration: "none" }}>
          <button className={styles.backButton}>BACK TO MAIN</button>
        </Link>
      </main>
    </div>
  );
};

export default PatientReport;
