import React from 'react';
import styles from './login.module.css'; // Import the CSS for styling
import logo from './component/logo covide-19.png'; // Import the logo image
import doctor from './component/doctor image.png'

const LoginPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.login_page}>
        {/* Header */}
        <header className={styles.header}>
            <div className={styles.logo}>
            <img src={logo} alt="COVID-19 Camp Logo" />
            </div>
            <nav className={styles.nav}>
            <a href="/" className={styles.nav_link}>HOME</a>
            <a href="#about" className={styles.nav_link}>ABOUT US</a>
            <button className={styles.cancel_button}>CANCEL</button>
            </nav>
        </header>

        {/* Main Content */}
        <div className={styles.main_content}>
            <div className={styles.illustration}>
            <img src={doctor} alt="Doctor Illustration" />
            </div>
            <div className={styles.login_form}>
            <h2>Login Account</h2>
            <form>
                <div className={styles.form_group}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Enter your username" />
                </div>
                <div className={styles.form_group}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" />
                </div>
                <div className={styles.form_options}>
                <div className= {styles.remember_password}>
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember password</label>
                </div>
                <a href="#forgot-password" className={styles.forgot_password_link}>
                    Forgot your password?
                </a>
                </div>
                <button type="submit" className={styles.login_button}>LOG IN</button>
            </form>
            </div>
        </div>
        </div>
    </div>
  );
};

export default LoginPage;
