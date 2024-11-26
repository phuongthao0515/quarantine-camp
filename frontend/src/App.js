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
  const API_URL = "http://localhost:3500/";

  const [username, setUserName] = useState("");

  const [password, setPassword] = useState("");

  const [patients, setPatients] = useState([
    {
      id: 1,
      PNUMBER: 1,
      fullname: "Nguyen Ban A",
      PHONE: 123,
      gender: "Male",
    },
    {
      id: 2,
      PNUMBER: 2,
      fullname: "Nguyen Ban B",
      PHONE: 123,
      gender: "Male",
    },
    {
      id: 3,
      PNUMBER: 3,
      fullname: "Nguyen Ban C",
      PHONE: 123,
      gender: "Male",
    },
    {
      id: 4,
      PNUMBER: 4,
      fullname: "Nguyen D",
      PHONE: 123,
      gender: "Male",
    },
    {
      id: 5,
      PNUMBER: 5,
      fullname: "Thi Ba A",
      PHONE: 123,
      gender: "Male",
    },
    {
      id: 6,
      PNUMBER: 6,
      fullname: "Thi Ba B",
      PHONE: 123,
      gender: "Male",
    },
    {
      id: 7,
      PNUMBER: 7,
      fullname: "Thi Ba C",
      PHONE: 123,
      gender: "Male",
    },
    {
      id: 8,
      PNUMBER: 8,
      fullname: "Thi Ba AAA",
      PHONE: 123,
      gender: "Male",
    },
    {
      id: 9,
      PNUMBER: 9,
      fullname: "Thi Ba Asdc",
      PHONE: 123,
      gender: "Male",
    },
    {
      id: 10,
      PNUMBER: 10,
      fullname: "asddaskdjsan",
      PHONE: 123,
      gender: "Male",
    },
    {
      id: 11,
      PNUMBER: 11,
      fullname: "Nguyen Ban A",
      PHONE: 123,
      gender: "Male",
    },
  ]);

  const [test, setTest] = useState([
    {
      Test_ID: 1,
      PNUM: 1,
      Quick_test_result: "Positive",
      Quick_test_ct_value: 1,
      PCR_test_result: "Positive",
      PCR_test_ct_value: 213,
      Respiratory_rate: 4,
      SPO2: 45,
    },
    {
      Test_ID: 2,
      PNUM: 1,
      Quick_test_result: "Positive",
      Quick_test_ct_value: 2,
      PCR_test_result: "Positive",
      PCR_test_ct_value: 12312,
      Respiratory_rate: 3,
      SPO2: 35,
    },
  ]);

  const [searchReal, setSearch] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const filteredResults = patients.filter((patient) =>
      patient.fullname.toLowerCase().includes(searchReal.toLowerCase())
    );

    setSearchResult(filteredResults);
  }, [searchReal, patients]);

  // No need: searchResult, useEffect when fetch from db
  //  useEffect(() => {
  //    const fetchDAtA = async () => {
  //      try {
  //        const response = await fetch(
  //          `http://localhost:3500/patients${
  //            searchReal ? `?name=${searchReal}` : "all-patients"
  //          }`
  //        );
  //        if (!response.ok) {
  //          throw new Error("Failed to fetch patients");
  //        }
  //        const data = await response.json();
  //        setPatients(data);
  //      } catch (error) {
  //        console.error("Error fetching patients:", error);
  //      }
  //    };

  //    fetchPatients();
  //  }, [searchReal]);

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
          />
        }
      />

      <Route element={<Layout />}>
        <Route
          path="/search"
          element={
            <Search
              searchReal={searchReal}
              searchResult={searchResult}
              setSearch={setSearch}
            />
          }
        />
        <Route path="/new" element={<AddNewPatient />} />
        <Route
          path="/test/:Id"
          element={<TestInfo test={test} setTest={setTest} />}
        />
        <Route
          path="/report/:Id"
          element={<Report test={test} setTest={setTest} patients={patients} />}
        />
        <Route
          path="/commobidity/:Id"
          element={<Commobidity patients={patients} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
