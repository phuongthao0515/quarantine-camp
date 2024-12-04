import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import logo from "./component/logo covide-19.png";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const nav = useNavigate();
  const handleLogOut = async () => {
    try {
      // Call the backend /logout endpoint
      const response = await fetch(`http://127.0.0.1:8000/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to log out. Please try again.");
      }

      nav("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Not connected. Please log in first");
      nav("/login");
    }
  };
  return (
    <div>
      <Header logo={logo} handleLogOut={handleLogOut} />
      <Outlet />
    </div>
  );
};
export default Layout;
