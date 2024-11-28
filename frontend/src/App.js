import Home from "./home";
import Login from "./login";
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
  const API_URL = "http://localhost:8000";

  const [username, setUserName] = useState("");

  const [password, setPassword] = useState("");

  const [patients, setPatients] = useState([]);

  const [searchReal, setSearch] = useState("");

  const [test, setTest] = useState([]);

  const { Comorbidity, setcom } = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `${API_URL}/${
            searchReal ? `search/name/${searchReal}` : "all-patients"
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

  const handleLogIn = () => {};

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <Login
            userName={username}
            password={password}
            setUserName={setUserName}
            setPassword={setPassword}
            handleLogIn={handleLogIn}
            API_URL={API_URL}
          />
        }
      />

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
        <Route path="/new" element={<AddNewPatient />} />
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
              patients={patients}
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
