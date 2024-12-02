import React, { useState, useEffect } from "react";
import addStyles from "./addpatient.module.css";

const AddPatient = ({ API_URL }) => {
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
  const seriousnessOptions = [
    { label: "Mild", value: 1 },
    { label: "Moderate", value: 2 },
    { label: "Severe", value: 3 },
  ];

  const [symptoms, setSymptoms] = useState([]);

  const [test, setTest] = useState({
    Date_time: null,
    PCR_result: false,
    PCR_ct_value: null,
    QT_result: false,
    QT_ct_value: null,
    Respiratory_rate: null,
    SPO2: null,
  });

  const [form, setForm] = useState({
    Fullname: "",
    PID: "",
    Gender: null,
    Risk_level: null,
    Address: "",
    Phone: "",
    Symptom: [],
    Comorbidity: [],
    Test: [],
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

    try {
      const response = await fetch(`${API_URL}/patient/insert`, postOptions);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Cannot add patient! Please try again."
        );
      }

      const data = await response.json();
      alert("Patient added successfully!");

      setForm({
        Fullname: "",
        PID: "",
        Gender: "",
        Risk_level: "",
        Address: "",
        Phone: "",
        Symptom: [],
        Comorbidity: [],
        Test: null,
      });
      setSymptoms([]);
      setComorbidities([]);
      setTest({
        Date_time: null,
        PCR_result: false,
        PCR_ct_value: null,
        QT_result: false,
        QT_ct_value: null,
        Respiratory_rate: null,
        SPO2: null,
      });
      window.location.reload();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    const isTestEmpty = Object.values(test).every(
      (value) => value === "" || value === false || value === null
    );

    setForm((prevForm) => ({
      ...prevForm,
      Symptom: symptoms,
      Comorbidity: comorbidities,
      Test: isTestEmpty ? null : [test],
    }));
  }, [symptoms, comorbidities, test]);

  const handleAddSymptom = () => {
    setSymptoms([
      ...symptoms,
      { name: "", startDate: null, endDate: null, seriousness: null },
    ]);
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
    newSymptoms[index][field] = field === "seriousness" ? String(value) : value;
    setSymptoms(newSymptoms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.PID && form.PID.length !== 12) {
      alert("PID must be exactly 12 characters long.");
      return;
    }

    if (form.Phone && form.Phone.length !== 9) {
      alert("Phone number must be exactly 9 characters long.");
      return;
    }

    const formattedForm = {
      ...form,
      Symptom: symptoms.map((symptom) => ({
        ...symptom,
        startDate: new Date(symptom.startDate).toISOString(),
        endDate: symptom.endDate
          ? new Date(symptom.endDate).toISOString()
          : null,
        seriousness: symptom.seriousness,
      })),
      Test:
        form.Test &&
        form.Test.map((testItem) => ({
          ...testItem,
          Date_time: testItem.Date_time
            ? new Date(testItem.Date_time).toISOString()
            : null,
        })),
    };

    console.log(JSON.stringify(formattedForm, null, 2)); // Debug payload
    await addForm(formattedForm);
  };

  return (
    <div className={addStyles.container}>
      <h1>Add New Patient</h1>
      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <section>
          <h2>Basic Information</h2>
          <div>
            <label>Patient Number</label>
            <input
              type="text"
              placeholder="Automatically generated."
              disabled
            />
          </div>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={form.Fullname}
              onChange={(e) => handleInput("Fullname", e.target.value)}
              required
            />
          </div>
          <div>
            <label>PID</label>
            <input
              type="text"
              placeholder="Enter patient ID"
              value={form.PID}
              maxLength={12}
              onChange={(e) => handleInput("PID", e.target.value)}
            />
          </div>
          <div>
            <label>Gender</label>
            <select
              value={form.Gender}
              onChange={(e) => handleInput("Gender", e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div>
            <label>Risk Level</label>
            <select
              value={form.Risk_level}
              onChange={(e) => handleInput("Risk_level", e.target.value)}
              required
            >
              <option value="">Select Risk Level</option>
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
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
              maxLength={9}
              onChange={(e) => handleInput("Phone", e.target.value)}
            />
          </div>
        </section>

        {/* Testing Information */}
        <section>
          <h2>Testing Information</h2>
          <div>
            <label>Test Date</label>
            <input
              type="datetime-local"
              value={test.Date_time}
              onChange={(e) => setTest({ ...test, Date_time: e.target.value })}
            />
          </div>
          <div>
            <label>PCR Test Result</label>
            <select
              value={test.PCR_result ? "Positive" : "Negative"}
              onChange={(e) =>
                setTest((prevTest) => ({
                  ...prevTest,
                  PCR_result: e.target.value === "Positive",
                  // Reset PCR_ct_value if PCR_result is false
                  PCR_ct_value:
                    e.target.value === "Positive"
                      ? prevTest.PCR_ct_value
                      : null,
                }))
              }
            >
              <option value="Negative">Negative</option>
              <option value="Positive">Positive</option>
            </select>
          </div>
          {/* Show PCR CT Value field only if the PCR test result is Positive */}
          {test.PCR_result && (
            <div>
              <label>PCR Test CT Value</label>
              <input
                type="number"
                placeholder="Enter CT Value"
                value={test.PCR_ct_value}
                min="0"
                max="100.99"
                step="0.01"
                onChange={(e) => {
                  setTest((prevTest) => ({
                    ...prevTest,
                    PCR_ct_value: parseFloat(e.target.value),
                  }));
                }}
              />
            </div>
          )}

          <div>
            <label>Quick Test Result</label>
            <select
              value={test.QT_result ? "Positive" : "Negative"}
              onChange={(e) =>
                setTest((prevTest) => ({
                  ...prevTest,
                  QT_result: e.target.value === "Positive",
                  // Reset QT_ct_value if QT_result is false
                  QT_ct_value:
                    e.target.value === "Positive" ? prevTest.QT_ct_value : null,
                }))
              }
            >
              <option value="Negative">Negative</option>
              <option value="Positive">Positive</option>
            </select>
          </div>
          {/* Show QT CT Value field only if the QT test result is Positive */}
          {test.QT_result && (
            <div>
              <label>QT Test CT Value</label>
              <input
                type="number"
                placeholder="Enter CT Value"
                value={test.QT_ct_value}
                min="0"
                max="100.99"
                step="0.01"
                onChange={(e) => {
                  setTest((prevTest) => ({
                    ...prevTest,
                    QT_ct_value: parseFloat(e.target.value),
                  }));
                }}
              />
            </div>
          )}
          {/* Removed duplicated QT Test CT Value field */}
          <div>
            <label>Respiratory Rate</label>
            <input
              type="number"
              placeholder="Enter Respiratory rate"
              value={test.Respiratory_rate}
              min="0"
              max="999.99"
              step="0.01"
              onChange={(e) =>
                setTest({
                  ...test,
                  Respiratory_rate: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div>
            <label>SPO2</label>
            <input
              type="number"
              placeholder="Enter SPO2 value"
              value={test.SPO2}
              min="0"
              max="100.99"
              step="0.01"
              onChange={(e) =>
                setTest({ ...test, SPO2: parseFloat(e.target.value) })
              }
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
                      {seriousnessOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
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
