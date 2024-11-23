import React from 'react';
import styles from './home.module.css';
import logo from './component/logo covide-19.png'; // Correct path to logo
import background from './component/doctor background.png'; // Correct path to background

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.homepage}
        style={{
          backgroundImage: `url(${background})`, // Set the background image
          backgroundSize: 'cover', // Ensure the background covers the entire container
          backgroundPosition: 'center', // Center the background image
          backgroundRepeat: 'no-repeat', // Prevent repetition of the image
          height: '100vh', // Full viewport height
        }}
      >
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <img src={logo} alt="COVID-19 Logo" className={styles.logo_image} />
          </div>
          <nav className={styles.nav}>
            <a href="#about" className={styles.nav_link}>
              ABOUT US
            </a>
            <button className={styles.login_button}>LOGIN</button>
          </nav>
        </header>

        {/* Main Content */}
        <div className={styles.main_content}>
          {/* Left Section */}
          <div className={styles.left_content}>
            <h1>Committed to Complete Healing</h1>
          </div>
        </div>

        {/* Services Section */}
        <div className={styles.services_section}>
          <h2>OUR SERVICES</h2>
          <p>
            Our COVID-19 Quarantine Camp provides a safe, supportive environment for isolation and recovery. With medical care and mental health support, we ensure the well-being of each individual while protecting the community.
          </p>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>
            <strong>Address:</strong> 268 Ly Thuong Kiet | <strong>Phone:</strong>{' '}
            0937567495
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
