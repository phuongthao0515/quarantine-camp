import Home from "./home";
import Login from "./login";
import Search from "./search_page";
import AddNewPatient from "./addpatient";
import TestInfo from "./testinfo";
import Report from "./Report";
// import Confirm from "./confirm";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Protect from "./Protect";
import Layout from "./Layout";
function App() {
  const [username, setUserName] = useState("");

  const [password, setPassword] = useState("");

  const [patients, setPatients] = useState([
    {
      id: 1,
      PNUMBER: 1,
      fullname: "Nguyen Ban A",
      PHONE: 123,
    },
    {
      id: 2,
      PNUMBER: 2,
      fullname: "Nguyen Ban B",
      PHONE: 123,
    },
    {
      id: 3,
      PNUMBER: 3,
      fullname: "Nguyen Ban C",
      PHONE: 123,
    },
    {
      id: 4,
      PNUMBER: 4,
      fullname: "Nguyen D",
      PHONE: 123,
    },
    {
      id: 5,
      PNUMBER: 5,
      fullname: "Thi Ba A",
      PHONE: 123,
    },
    {
      id: 6,
      PNUMBER: 6,
      fullname: "Thi Ba B",
      PHONE: 123,
    },
    {
      id: 7,
      PNUMBER: 7,
      fullname: "Thi Ba C",
      PHONE: 123,
    },
    {
      id: 8,
      PNUMBER: 8,
      fullname: "Thi Ba AAA",
      PHONE: 123,
    },
    {
      id: 9,
      PNUMBER: 9,
      fullname: "Thi Ba Asdc",
      PHONE: 123,
    },
    {
      id: 10,
      PNUMBER: 10,
      fullname: "asddaskdjsan",
      PHONE: 123,
    },
    {
      id: 11,
      PNUMBER: 11,
      fullname: "Nguyen Ban A",
      PHONE: 123,
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
  //    const fetchPatients = async () => {
  //      try {
  //        const response = await fetch(
  //          `http://localhost:8000/patients${
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
        <Route path="/test/:Id" element={<TestInfo />} />
        <Route path="/report/:Id" element={<Report />} />
        {/* <Route path="/commobidity/:Id" element={< />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
