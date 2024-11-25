import React, { useState } from "react";
import addStyles from "./addpatient.module.css";

const AddPatient = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [comorbidities, setComorbidities] = useState([]);

  const handleAddSymptom = () => {
    setSymptoms([...symptoms, { name: "", startDate: "", seriousness: "" }]);
  };

  const handleComorbidityClick = (comorbidity) => {
    setComorbidities((prev) =>
      prev.includes(comorbidity)
        ? prev.filter((item) => item !== comorbidity)
        : [...prev, comorbidity]
    );
  };

  return (
    <div className={addStyles.container}>
      <h1>Add New Patient</h1>
      <form>
        {/* Basic Information */}
        <section>
          <h2>Basic Information</h2>
          <div>
            <label>Patient Number</label>
            <input type="text" placeholder="Enter patient number" />
          </div>
          <div>
            <label>Full Name</label>
            <input type="text" placeholder="Enter full name" />
          </div>
          <div>
            <label>PID</label>
            <input type="text" placeholder="Enter patient ID" />
          </div>
          <div>
            <label>Gender</label>
            <select>
              <option>Male</option>
              <option>Female</option>
            </select>
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
            <label>Address</label>
            <input type="text" placeholder="Enter address" />
          </div>
          <div>
            <label>Phone</label>
            <input type="text" placeholder="Enter phone number" />
          </div>
        </section>

        {/* Testing Information */}
        <section>
          <h2>Testing Information</h2>
          <div>
            <label>Test ID</label>
            <input type="text" placeholder="Enter Test ID" />
          </div>
          <div>
            <label>PCR Test Result</label>
            <select>
              <option>Positive</option>
              <option>Negative</option>
            </select>
          </div>
          <div>
            <label>SPO2</label>
            <input type="text" placeholder="Enter SPO2 value" />
          </div>
        </section>

        {/* Symptoms */}
        <section>
          <h2>Symptoms</h2>
          <table className={addStyles.symptoms_table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>Serious Level</th>
              </tr>
            </thead>
            <tbody>
              {symptoms.map((symptom, index) => (
                <tr key={index}>
                  <td>
                    <input type="text" placeholder="Symptom name" />
                  </td>
                  <td>
                    <input type="date" />
                  </td>
                  <td>
                    <input type="text" placeholder="Serious level" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className={addStyles.enter}
            type="button"
            onClick={handleAddSymptom}
          >
            Add Symptom
          </button>
        </section>

        {/* Comorbidities */}
        <section>
          <h2>Comorbidities</h2>
          {/* <div className={addStyles.comorbidity}>
                        {[
                            'Diabetes',
                            'Heart disease',
                            'Kidney disease',
                            'Pregnancy',
                            'Obesity',
                            'Chronic lung disease',
                            'Weakened immune system',
                            'Stroke',
                        ].map((comorbidity) => (
                            <button
                                type="button"
                                key={comorbidity}
                                className={
                                    comorbidities.includes(comorbidity)
                                        ? 'active'
                                        : ''
                                }
                                onClick={() =>
                                    handleComorbidityClick(comorbidity)
                                }
                            >
                                {comorbidity}
                            </button>
                        ))}
                    </div> */}
          <div className={addStyles.comorbidity}>
            {[
              "Diabetes",
              "Heart disease",
              "Kidney disease",
              "Pregnancy",
              "Obesity",
              "Chronic lung disease",
              "Weakened immune system",
              "Stroke",
            ].map((comorbidity) => (
              <label key={comorbidity} className={addStyles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={comorbidities.includes(comorbidity)}
                  onChange={() => handleComorbidityClick(comorbidity)}
                  className={addStyles.checkboxInput}
                />
                <span className={addStyles.checkboxWord}>{comorbidity}</span>
              </label>
            ))}
          </div>
        </section>

        <button className={addStyles.done} type="submit">
          Done
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
