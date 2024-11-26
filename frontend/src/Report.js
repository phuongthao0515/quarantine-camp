import React from "react";
import styles from "./report.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const PatientReport = ({ test, setTest, patients }) => {
  const { Id } = useParams();

  const patient = patients.find((patient) => patient.PNUMBER.toString() === Id);
  const [symptoms, setSymptoms] = useState([
    {
      name: "Fever",
      startDate: "2024-11-20",
      endDate: "2024-11-22",
      seriousLevel: 2,
    },
    {
      name: "Cough",
      startDate: "2024-11-18",
      endDate: "2024-11-22",
      seriousLevel: 3,
    },
  ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch all data concurrently
  //       const [testResponse, patientResponse, symptomResponse] =
  //         await Promise.all([
  //           fetch(`/tests/${pnum}`), // Fetch test information by `pnum`
  //           fetch(`/patients/${pnum}`), // Fetch patient information by `pnum`
  //           fetch(`/symptoms/${pnum}`), // Fetch symptom information by `pnum`
  //         ]);

  //       // Check if any of the responses are not OK
  //       if (!testResponse.ok || !patientResponse.ok || !symptomResponse.ok) {
  //         throw new Error("Failed to fetch one or more resources");
  //       }

  //       // Parse JSON responses
  //       const testData = await testResponse.json();
  //       const patientData = await patientResponse.json();
  //       const symptomData = await symptomResponse.json();

  //       // Update state with the fetched data
  //       setTest(testData);
  //       setPatient(patientData);
  //       setSymptom(symptomData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [pnum]);
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
                test.map((testEntry, index) => (
                  <tr key={index}>
                    <td>{testEntry.Test_ID}</td>
                    <td>{testEntry.PNUM}</td>
                    <td>{testEntry.Quick_test_result}</td>
                    <td>{testEntry.Quick_test_ct_value}</td>
                    <td>{testEntry.Respiratory_rate}</td>
                    <td>{testEntry.PCR_test_result}</td>
                    <td>{testEntry.PCR_test_ct_value}</td>
                    <td>{testEntry.SPO2}%</td>
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
                  <td>{symptom.name}</td>
                  <td>{symptom.startDate}</td>
                  <td>{symptom.endDate || "Ongoing"}</td>
                  <td>{symptom.seriousLevel}</td>
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

        <Link to={`/search`} style={{ textDecoration: "none" }}>
          <button className={styles.backButton}>BACK TO MAIN</button>
        </Link>
      </main>
    </div>
  );
};

export default PatientReport;
