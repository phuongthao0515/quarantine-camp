import React from "react";
import styles from "./login.module.css"; // Import the CSS for styling
import logo from "./component/logo covide-19.png"; // Import the logo image
import doctor from "./component/doctor image.png";
import { Link } from "react-router-dom";
const LoginPage = ({
  userName,
  password,
  setUserName,
  setPassword,
  handleLogIn,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.login_page}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <img src={logo} alt="COVID-19 Camp Logo" />
          </div>
          <nav className={styles.nav}>
            <Link to="/" className={styles.nav_link}>
              HOME
            </Link>
            <Link to="/" className={styles.nav_link}>
              ABOUT US
            </Link>
            <Link to="/">
              <button className={styles.cancel_button}>CANCEL</button>
            </Link>
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
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.tartget.value)}
                />
              </div>
              <div className={styles.form_options}>
                <div className={styles.remember_password}>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember password</label>
                </div>
                <a
                  href="#forgot-password"
                  className={styles.forgot_password_link}
                >
                  Forgot your password?
                </a>
              </div>
              {/* Temp link, need to get token later */}
              <Link to="/search">
                <button
                  type="submit"
                  className={styles.login_button}
                  onClick={handleLogIn}
                >
                  LOG IN
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
