import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./login";

const LoginContainer = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setErrorMessage(""); // Clear any existing error messages

    try {
      const response = await fetch("http://localhost:8000/patient/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, password: password }),
      });

      if (!response.ok) {
        // Handle error: response not OK (status 4xx or 5xx)
        const errorData = await response.json();
        const errorMsg = errorData.detail || "Login failed. Please try again.";
        setErrorMessage(errorMsg); // Display the error message
        console.error("Login failed:", errorMsg);
      } else {
        // Login was successful
        const data = await response.json();
        console.log("Login successful:", data);

        // Navigate to the next page (e.g., dashboard)
        navigate("/search"); // Adjust the path as needed
      }
    } catch (error) {
      // Handle fetch or network errors
      console.error("Error:", error);
      setErrorMessage("An error occurred while trying to log in. Please try again.");
    }
  };

  return (
    <LoginPage
      userName={userName}
      password={password}
      setUserName={setUserName}
      setPassword={setPassword}
      handleLogIn={handleLogIn}
      errorMessage={errorMessage}
    />
  );
};

export default LoginContainer;