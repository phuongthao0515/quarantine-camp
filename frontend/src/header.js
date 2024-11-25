import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = ({ logo, handleLogOut }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="COVID-19 Camp Logo" />
        </div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.nav_link}>
            HOME{" "}
          </Link>
          <Link to="/" className={styles.nav_link}>
            ABOUT US
          </Link>
          <div className={styles.user_profile}>
            <span>PHAN TRONG NHAN</span>
            <span className={styles.role}>ROLE: HEAD</span>
          </div>
          <button className={styles.logout_button} onClick={handleLogOut}>
            LOG OUT
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
