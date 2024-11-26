import React, { useState, useEffect } from "react";
import addStyles from "./addpatient.module.css";
import apiRequest from "./apiRequest.js";

const AddPatient = () => {
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
  const seriousnessOptions = ["Mild", "Moderate", "Severe"];

  const [symptoms, setSymptoms] = useState([]);

  const [test, setTest] = useState({
    Id: "",
    PCR_Test_Result: "",
    pcr_Ct_Value: "",
    QT_Test_Result: "",
    qt_Ct_Value: "",
    Res: "",
    SPO2: "",
  });

  const [fetchError, setFetchError] = useState(null);

  const [form, setForm] = useState({
    PNUMBER: "",
    fullname: "",
    PID: "",
    Gender: "",
    Risk_level: "",
    Address: "",
    Phone: "",
    symptom: [],
    comorbidity: [],
    Test: {
      Id: "",
      PCR_Test_Result: "",
      pcr_Ct_Value: "",
      QT_Test_Result: "",
      qt_Ct_Value: "",
      Res: "",
      SPO2: "",
    },
  });

  const [comorbidities, setComorbidities] = useState([]);
  const addForm = async (item) => {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    const result = await apiRequest("API_URL", postOptions);
    if (result) setFetchError(result);
  };

  useEffect(() => {
    setForm((form) => ({
      ...form,
      symptom: symptoms,
      comorbidity: comorbidities,
      Test: test,
    }));
  }, [symptoms, comorbidities, test]);

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

  const handleInput = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSymptomChange = (index, field, value) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index][field] = value;
    setSymptoms(newSymptoms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form) return;
    addForm(form);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Create a JSON blob from the form data
  //   const dataStr = JSON.stringify(form, null, 2);
  //   const blob = new Blob([dataStr], { type: "application/json" });
  //   // Create a link to download the blob
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "patient_data.json";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   // Clean up the URL object
  //   URL.revokeObjectURL(url);
  // };
  return (
    <div className={addStyles.container}>
      <h1>Add New Patient</h1>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <section>
          <h2>Basic Information</h2>
          <div>
            <label>Patient Number</label>
            <input type="text" placeholder="123" disabled />
          </div>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={form.fullname}
              onChange={(e) => handleInput("fullname", e.target.value)}
            />
          </div>
          <div>
            <label>PID</label>
            <input
              type="text"
              placeholder="Enter patient ID"
              value={form.PID}
              onChange={(e) => handleInput("PID", e.target.value)}
            />
          </div>
          <div>
            <label>Gender</label>
            <select
              value={form.Gender}
              onChange={(e) => handleInput("Gender", e.target.value)}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div>
            <label>Risk Level</label>
            <select
              value={form.Risk_level}
              onChange={(e) => handleInput("Risk_level", e.target.value)}
            >
              <option value="">Select Risk Level</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter address"
              value={form.Address}
              onChange={(e) => handleInput("Address", e.target.value)}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={form.Phone}
              onChange={(e) => handleInput("Phone", e.target.value)}
            />
          </div>
        </section>

        {/* Testing Information */}
        <section>
          <h2>Testing Information</h2>
          <div>
            <label>Test ID</label>
            <input
              type="text"
              placeholder="Enter Test ID"
              value={test.Id}
              onChange={(e) => setTest({ ...test, Id: e.target.value })}
            />
          </div>
          <div>
            <label>PCR Test Result</label>
            <select
              value={test.PCR_Test_Result}
              onChange={(e) => {
                const value = e.target.value;
                setTest((prevTest) => ({
                  ...prevTest,
                  PCR_Test_Result: value,
                  pcr_Ct_Value:
                    value === "Positive" ? prevTest.pcr_Ct_Value : "",
                }));
              }}
            >
              <option value="">Select PCR Test Result</option>
              <option>Positive</option>
              <option>Negative</option>
            </select>
          </div>
          {/* Show PCR CT Value field only if the PCR test result is Positive */}
          {test.PCR_Test_Result === "Positive" && (
            <div>
              <label>PCR Test CT Value</label>
              <input
                type="text"
                placeholder="Enter CT Value"
                value={test.pcr_Ct_Value}
                onChange={(e) =>
                  setTest((prevTest) => ({
                    ...prevTest,
                    pcr_Ct_Value: e.target.value,
                  }))
                }
              />
            </div>
          )}

          <div>
            <label>Quick Test Result</label>
            <select
              value={test.QT_Test_Result}
              onChange={(e) => {
                const value = e.target.value;
                setTest((prevTest) => ({
                  ...prevTest,
                  QT_Test_Result: value,
                  qt_Ct_Value: value === "Positive" ? prevTest.qt_Ct_Value : "",
                }));
              }}
            >
              <option value="">Select QT Test Result</option>
              <option>Positive</option>
              <option>Negative</option>
            </select>
          </div>
          {/* Show QT CT Value field only if the QT test result is Positive */}
          {test.QT_Test_Result === "Positive" && (
            <div>
              <label>QT Test CT Value</label>
              <input
                type="text"
                placeholder="Enter CT Value"
                value={test.qt_Ct_Value}
                onChange={(e) =>
                  setTest((prevTest) => ({
                    ...prevTest,
                    qt_Ct_Value: e.target.value,
                  }))
                }
              />
            </div>
          )}

          <div>
            <label>Respiratory Rate</label>
            <input
              type="text"
              placeholder="Enter Respiratory rate"
              value={test.Res}
              onChange={(e) => setTest({ ...test, Res: e.target.value })}
            />
          </div>
          <div>
            <label>SPO2</label>
            <input
              type="text"
              placeholder="Enter SPO2 value"
              value={test.SPO2}
              onChange={(e) => setTest({ ...test, SPO2: e.target.value })}
            />
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
                        handleSymptomChange(
                          index,
                          "seriousness",
                          e.target.value
                        )
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
        {/* Display fetch error if any */}
        {fetchError && <p className={addStyles.error}>{fetchError}</p>}
      </form>
    </div>
  );
};

export default AddPatient;
