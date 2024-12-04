import Home from "./home";
import Login from "./login";
import LoginContainer from "./LoginContainer";
import Search from "./search_page";
import AddNewPatient from "./addpatient";
import TestInfo from "./testinfo";
import Report from "./Report";
// import Confirm from "./confirm";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Commobidity from "./Commobidity";
import Protect from "./Protect";
import Layout from "./Layout";
function App() {
  const API_URL = "http://127.0.0.1:8000";

  const [patients, setPatients] = useState([]);

  const [searchReal, setSearch] = useState("");

  const [test, setTest] = useState([]);

  const [Comorbidity, setcom] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${API_URL}/${
            searchReal
              ? `patient/search/name/${searchReal}`
              : "patient/all-patients"
          }`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [searchReal]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginContainer />} />

      <Route element={<Layout />}>
        <Route
          path="/search"
          element={
            <Search
              searchReal={searchReal}
              searchResult={patients}
              setSearch={setSearch}
              API_URL={API_URL}
            />
          }
        />
        <Route
          path="/new"
          element={
            <AddNewPatient API_URL={API_URL} setPatients={setPatients} />
          }
        />
        <Route
          path="/test/:Id"
          element={<TestInfo test={test} setTest={setTest} API_URL={API_URL} />}
        />
        <Route
          path="/report/:Id"
          element={
            <Report
              test={test}
              setTest={setTest}
              API_URL={API_URL}
              Comorbidity={Comorbidity}
              setcom={setcom}
            />
          }
        />
        <Route
          path="/commobidity/:Id"
          element={
            <Commobidity
              API_URL={API_URL}
              Comorbidity={Comorbidity}
              setcom={setcom}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
