import React from "react";
import styles from "./Commobidity.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const Commobidity = ({ API_URL, Comorbidity, setcom }) => {
  const { Id } = useParams();

  // Fetch com data
  useEffect(() => {
    const fetchCom = async () => {
      try {
        const response = await fetch(`${API_URL}/patient/comorbidity/${Id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Comorbidity");
        }
        const data = await response.json();
        setcom(data);
      } catch (error) {
        console.error("Error fetching Comorbidity:", error);
      }
    };

    fetchCom();
  }, [Id]);
  return (
    <div className="container">
      <main className={styles.main}>
        <h1>Patient Number: {Id}</h1>

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
        <Link to={`/search`} style={{ textDecoration: "none" }}>
          <button className={styles.backButton}>BACK TO MAIN</button>
        </Link>
      </main>
    </div>
  );
};

export default Commobidity;
