// import React from 'react';
// import './index.css';
// import logo from './component/BachKhoaLogo.png'

// function Spss(){
//     return (
//         <div className='NavigationBar'>
//             <div>
//                 <img src={logo} alt = "logo" className='logoimage'></img>
//             </div>
//             <div className='SystemName'>
//                 <p>HCMUT</p>
//                 <p>SPSS</p>
//             </div>
//             <div>
                
//                 </div>
//         </div>
//     );
// }

// export default Spss;
import React from 'react';
import './index.css';
import logo from './component/BachKhoaLogo.png'; // Ensure the logo image exists in this path
import illustration from './component/image1.png'; // Add your illustration image to this path

function Spss() {
  return (
    <div className="SpssContainer">
      {/* Navigation Bar */}
      <div className="NavigationBar">
        <div className="LogoSection">
          <img src={logo} alt="logo" className="LogoImage" />
          <div className="SystemName">
            <p>HCMUT</p>
            <p>SPSS</p>
          </div>
        </div>
        <div className="NavbarButtons">
          <button className="AboutUsButton"><b>ABOUT US</b></button>
          <button className="CancelButton"><b>CANCEL</b></button>
        </div>
      </div>

      {/* Main Content */}
      <div className="MainContent">
        {/* Image */}
        <div className="IllustrationSection">
          <img src={illustration} alt="Illustration" className="IllustrationImage" />
        </div>

        {/* Login Form */}
        <div className="LoginForm">
          <h2 className="LoginHeader">Login Account</h2>
          <form>
            <div className="FormGroup">
              <label htmlFor="username" >Username</label>
              <input type="text" id="username" placeholder="Username" />
            </div>
            <div className="FormGroup">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className="FormOptions">
              <label>
                <input type="checkbox" /> Remember your account
              </label>
              <a href="#" className="ForgotPassword">Forgot your password?</a>
            </div>
            <button type="submit" className="LoginButton"><b>LOG IN</b></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Spss;
