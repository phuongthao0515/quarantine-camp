import React from "react";
import loginStyles from "./login.module.css"; // Import the CSS for styling
import logo from "./component/logo covide-19.png"; // Import the logo image
import doctor from "./component/doctor image.png";
import { Link } from "react-router-dom";
const LoginPage = ({
  userName,
  password,
  setUserName,
  setPassword,
  handleLogIn,
  errorMessage,
}) => {
  return (
    <div className="container">
      <div className={loginStyles.login_page}>
        {/* Header */}
        <header className={loginStyles.header}>
          <div className={loginStyles.logo}>
            <img src={logo} alt="COVID-19 Camp Logo" />
          </div>
          <nav className={loginStyles.nav}>
            <Link to="/" className={loginStyles.nav_link}>
              HOME
            </Link>
            <Link to="/" className={loginStyles.nav_link}>
              ABOUT US
            </Link>
            <Link to="/">
              <button className={loginStyles.cancel_button}>CANCEL</button>
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <div className={loginStyles.main_content}>
          <div className={loginStyles.illustration}>
            <img src={doctor} alt="Doctor Illustration" />
          </div>
          <div className={loginStyles.login_form}>
            <h2>Login Account</h2>
            <form onSubmit={handleLogIn}> {/* Handle submit on this form */}
              <div className={loginStyles.form_group}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className={loginStyles.form_group}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={loginStyles.form_options}>
                <div className={loginStyles.remember_password}>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember password</label>
                </div>
                <a
                  href="#forgot-password"
                  className={loginStyles.forgot_password_link}
                >
                  Forgot your password?
                </a>
              </div>

              {/* Submit button inside the same form */}
              <button
                type="submit"
                className={loginStyles.login_button}
              >
                LOG IN
              </button>

              {errorMessage && <p className={loginStyles.error_message}>{errorMessage}</p>}
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
