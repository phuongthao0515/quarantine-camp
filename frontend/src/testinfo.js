import React from "react";
import styles from "./testinfo.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const PatientTestingInfo = ({ test, setTest }) => {
  const { Id } = useParams();

  // Fetch test data
  // useEffect(() => {
  //   const fetchTestInfo = async () => {
  //     try {
  //       const response = await fetch(`/tests?name=${Id}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch test information");
  //       }
  //       const data = await response.json();
  //       setTest(data);
  //     } catch (error) {
  //       console.error("Error fetching test information:", error);
  //     }
  //   };

  //   fetchTestInfo();
  // }, [Id,setTest]); // Run this effect whenever `pnum` changes

  return (
    <div className="container">
      <div className={styles.patient_info}>
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
                {test.map((each) => (
                  <tr>
                    <td>{each.Test_ID}</td>
                    <td>{each.PNUM}</td>
                    <td>{each.Quick_test_result}</td>
                    <td>{each.Quick_test_ct_value}</td>
                    <td>{each.Respiratory_rate}</td>
                    <td>{each.PCR_test_result}</td>
                    <td>{each.PCR_test_ct_value}</td>
                    <td>{each.SPO2}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to={`/search`} style={{ textDecoration: "none" }}>
            <button className={styles.backButton}>BACK TO MAIN</button>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default PatientTestingInfo;
