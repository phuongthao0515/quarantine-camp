import React from 'react';
import styles from './header.module.css';
import logo from './component/logo covide-19.png';

const Header = () => {
    return (
        <div className = {styles.container}>
            <header className={styles.header}>
            <div className={styles.logo}>
            <img src={logo} alt="COVID-19 Camp Logo" />
            </div>
            <nav className={styles.nav}>
            <a href="#" className={styles.nav_link}>HOME</a>
            <a href="#" className={styles.nav_link}>ABOUT US</a>
            <div className={styles.user_profile}>
                <span>PHAN TRONG NHAN</span>
                <span className={styles.role}>ROLE: HEAD</span>
            </div>
            <button className={styles.logout_button}>LOG OUT</button>
            </nav>
        </header>
        </div>
    );
  };
  
  export default Header;