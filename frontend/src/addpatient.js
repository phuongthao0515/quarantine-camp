import React, { useState } from "react";
import addStyles from "./addpatient.module.css";

const AddPatient = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [comorbidities, setComorbidities] = useState([]);

  const handleAddSymptom = (symptom) => {
    setSymptoms([...symptoms, symptom]);
  };

  const handleComorbidityClick = (comorbidity) => {
    setComorbidities((prev) =>
      prev.includes(comorbidity)
        ? prev.filter((item) => item !== comorbidity)
        : [...prev, comorbidity]
    );
  };

  let symptom = {
    name: "",
    startDate: "",
    seriousness: "",
  };

  const [form, setForm] = useState({
    fullname: "",
    PNUMBER: "",
    PID: "",
    Gender: "",
    Risk_level: "",
    Address: "",
    Phone: "",
    symptom: {
      name: "",
      startDate: "",
      seriousness: "",
    },
    comorbidity: [],
    Test: {
      Id: 1,
      PCR_Test_Result: 1,
      SPO2: 2,
    },
  });

  useEffect(() => {
    setForm((form) => ({
      ...form,
      symptom: symptoms,
      comorbidity: comorbidities,
    }));
  }, [symptoms, comorbidities]);

  const handleInput = (name, value) => {
    setForm({ ...form, [name]: value });
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
            <input
              type="text"
              placeholder="Enter patient number"
              value={form.PNUMBER}
              onChange={(e) => handleInput("PNUMBER", e.target.value)}
            />
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
              value={form.test.Id}
              onChange={(e) => handleInput("test.Id", e.target.value)}
            />
          </div>
          <div>
            <label>PCR Test Result</label>
            <select
              value={form.test.PCR_Test_Result}
              onChange={(e) =>
                handleInput("test.PCR_Test_Result", e.target.value)
              }
            >
              <option>Positive</option>
              <option>Negative</option>
            </select>
          </div>
          <div>
            <label>SPO2</label>
            <input
              type="text"
              placeholder="Enter SPO2 value"
              value={form.test.SPO2}
              onChange={handleInput("test.SPO2", e.target.value)}
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
                    <input
                      type="text"
                      placeholder="Symptom name"
                      value={form.symptom.name}
                      onChange={handleInput("symptom.name", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={form.symptom.startDate}
                      onChange={handleInput(
                        "symptom.startDate",
                        e.target.value
                      )}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Serious level"
                      value={form.symptom.seriousness}
                      onChange={handleInput(
                        "symptom.seriousness",
                        e.target.value
                      )}
                    />
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
