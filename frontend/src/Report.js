import React from "react";
import styles from "./report.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const PatientReport = ({ test, setTest, API_URL, Comorbidity, setcom }) => {
  const { Id } = useParams();

  const [symptoms, setSymptoms] = useState([]);
  const [patient, setPatient] = useState({});
  const [treatments, setTreatment] = useState([]);
  // Fetch report data
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`${API_URL}/patient/report/${Id}`);
        if (!response.ok) {
          throw new Error("Failed to Report information");
        }
        const data = await response.json();
        setcom(data.comorbidities);
        setSymptoms(data.symptoms);
        setTest(data.test_results);
        setPatient(data.patient_info[0]);
        setTreatment(data.treatment_records[0].TREATMENT);
      } catch (error) {
        console.error("Error fetching Report:", error);
      }
    };

    fetchReport();
  }, [API_URL, Id, setcom, setTest]);
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
              <input
                type="text"
                value={
                  patient.GENDER === "F"
                    ? "Female"
                    : patient.GENDER === "M"
                    ? "Male"
                    : ""
                }
                readOnly
              />
            </div>
            <div>
              <label>PID</label>
              <input type="text" value={patient.PID} readOnly />
            </div>
            <div>
              <label>Risk Level</label>
              <input type="text" value={patient.RISK_LEVEL} readOnly />
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
                test.map((each, index) => (
                  <tr key={index}>
                    <td>{each.TEST_ID}</td>
                    <td>{each.PNUMBER}</td>
                    <td>{each.Qt_result}</td>
                    <td>{each.QT_ct_value}</td>
                    <td>{each.RESPIRATORY_RATE}</td>
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
              {symptoms.length > 0 ? (
                symptoms.map((symptom, index) => (
                  <tr key={index}>
                    <td>{symptom.SYMP_NAME}</td>
                    <td>{symptom.START_DATE.replace("T", " ")}</td>
                    <td>
                      {(symptom.END_DATE &&
                        symptom.END_DATE.replace("T", " ")) ||
                        "Ongoing"}
                    </td>
                    <td>{symptom.SERIOUS_LEVEL}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No symtomps found</td>
                </tr>
              )}
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
              {Comorbidity && Comorbidity.length > 0 ? (
                Comorbidity.map((each, index) => (
                  <tr key={index}>
                    <td>{each.COMORBIDITY_NAME}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="1">No comorbidities found.</td>
                </tr>
              )}
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
              {treatments.length > 0 ? (
                treatments.map((treatment, index) => (
                  <tr key={index}>
                    <td>{treatment.TREAT_ID}</td>
                    <td>
                      {treatment.DOCTOR_ID.map((doctorId, idx) => (
                        <div key={idx}>{doctorId}</div>
                      ))}
                    </td>
                    <td>{treatment.START_DATE.replace("T", " ")}</td>
                    <td>{treatment.END_DATE.replace("T", " ")}</td>
                    <td>{treatment.RESULT}</td>
                    <td>
                      {treatment.MEDICINE.map((medicine, idx) => (
                        <div key={idx}>
                          MCODE: {medicine.MCODE}, Quantity: {medicine.QUANTITY}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No treatment data available</td>
                </tr>
              )}
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
