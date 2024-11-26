import React from "react";
import styles from "./Commobidity.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const Commobidity = ({ patients }) => {
  const { Id } = useParams();

  const patient = patients.find((patient) => patient.PNUMBER.toString() === Id);
  return (
    <div className="container">
      <main className={styles.main}>
        <h1>Patient Number: {patient.PNUMBER}</h1>

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

export default Commobidity;
