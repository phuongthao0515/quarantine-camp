import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import logo from "./component/logo covide-19.png";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const nav = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    nav("/login");
  };
  return (
    <div>
      <Header logo={logo} handleLogOut={handleLogOut} />
      <Outlet />
    </div>
  );
};
export default Layout;
