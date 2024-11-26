import React, { useState } from "react";
import addStyles from "./addpatient.module.css";

const AddPatient = () => {
  // Predefined options for symptoms and seriousness levels
  const symptomOptions = [
    "Fever or chills",
    "Cough",
    "Difficulty breathing",
    "Fatigue",
    "Muscle or body aches",
    "Headache",
    "Loss of taste or smell",
    "Sore throat",
    "Congestion or runny nose",
    "Nausea or vomiting",
    "Diarrhea",
  ];
  const seriousnessOptions = ["1. Mild", "2. Moderate", "3. Severe"];

  const [symptoms, setSymptoms] = useState([]);
  const [comorbidities, setComorbidities] = useState([]);
  const [pcrTestResult, setPcrTestResult] = useState(""); // State to store PCR Test Result
  const [pcrCtValue, setPcrCtValue] = useState(""); // State to store PCR CT Value
  const [qtTestResult, setQTTestResult] = useState(""); // State to store PCR Test Result
  const [qtCtValue, setQTCtValue] = useState("");

  // Add a new symptom row
  const handleAddSymptom = () => {
    setSymptoms([...symptoms, { name: "", startDate: "", seriousness: "" }]);
  };

  // Handle changes for the symptom inputs
  const handleSymptomChange = (index, field, value) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index][field] = value;
    setSymptoms(newSymptoms);
  };

  // Toggle the selected comorbidity
  const handleComorbidityClick = (comorbidity) => {
    setComorbidities((prev) =>
      prev.includes(comorbidity)
        ? prev.filter((item) => item !== comorbidity)
        : [...prev, comorbidity]
    );
  };

  // Handle changes in PCR Test Result selection
  const handlePcrTestResultChange = (e) => {
    setPcrTestResult(e.target.value);
    if (e.target.value === "Negative") {
      setPcrCtValue(""); // Reset CT value if PCR result is Negative
    }
  };

  const handleQTTestResultChange = (e) => {
    setQTTestResult(e.target.value);
    if (e.target.value === "Negative") {
      setQTCtValue(""); // Reset CT value if PCR result is Negative
    }
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
            <select value={pcrTestResult} onChange={handlePcrTestResultChange}>
              <option value="">Select PCR Test Result</option>
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>
          </div>
          {/* Show PCR CT Value field only if the PCR test result is Positive */}
          {pcrTestResult === "Positive" && (
            <div>
              <label>PCR Test CT Value</label>
              <input
                type="text"
                placeholder="Enter CT Value"
                value={pcrCtValue}
                onChange={(e) => setPcrCtValue(e.target.value)}
              />
            </div>
          )}

            <div>
            <label>Quick Test Result</label>
            <select value={qtTestResult} onChange={handleQTTestResultChange}>
              <option value="">Select QT Test Result</option>
              <option value="Positive">Positive</option>
              <option value="Negative">Negative</option>
            </select>
          </div>
          {/* Show PCR CT Value field only if the PCR test result is Positive */}
          {qtTestResult === "Positive" && (
            <div>
              <label>QT Test CT Value</label>
              <input
                type="text"
                placeholder="Enter CT Value"
                value={qtCtValue}
                onChange={(e) => setQTCtValue(e.target.value)}
              />
            </div>
          )}



          <div>
            <label>Respiratory Rate</label>
            <input type="text" placeholder="Enter Respiratory rate" />
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
                    <select
                      value={symptom.name}
                      onChange={(e) =>
                        handleSymptomChange(index, "name", e.target.value)
                      }
                    >
                      <option value="">Select a symptom</option>
                      {symptomOptions.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="date"
                      value={symptom.startDate}
                      onChange={(e) =>
                        handleSymptomChange(index, "startDate", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={symptom.seriousness}
                      onChange={(e) =>
                        handleSymptomChange(index, "seriousness", e.target.value)
                      }
                    >
                      <option value="">Select serious levels</option>
                      {seriousnessOptions.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
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
