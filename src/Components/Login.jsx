// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { InputText } from "primereact/inputtext";
// import { InputOtp } from "primereact/inputotp";
// import { Button } from "primereact/button";

// import { useAuth } from "../utils/AuthProvider";
// import axios from "axios";
// import "./Login.css";

// const Login = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState(); // OTP as an array of 5 digits
//   const [otpError, setOtpError] = useState("");
//   const { login } = useAuth();

//   const navigate = useNavigate();

//   const handleOtpChange = (index, value) => {
//     const newOtp = [...otp];
//     if (/^\d?$/.test(value)) {
//       // Only allow numbers
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Move to next input if value is entered
//       if (value && index < 4) {
//         document.getElementById(`otp-${index + 1}`).focus();
//       }
//     }
//   };

//   const onLogin = async (index, value) => {
//     try {
//       console.log(otp, phoneNumber);
//       const res = await axios({
//         method: "POST",
//         url: "http://localhost:8000/login",
//         data: {
//           phoneNumber,
//           otp,
//         },
//       });
//       if (res.status === 200) {
//         login("dummyToken");
//         console.log("id = ", res);
//         localStorage.setItem("userId", res?.data?.data?.id);
//         const role = res?.data?.data?.role;
//         localStorage.setItem("role", role);
//         if (role === "Customer") navigate("/customer-details/profile");
//         else if (role === "Agent") navigate("/agent/order");
//         else if (role === "Admin") navigate("/admin/order");
//       }
//       console.log("---", login);
//     } catch (ex) {
//       console.error(ex);
//     }
//   };

//   const sendOtp = async () => {
//     // Combine the OTP array into a single string
//     try {
//       const res = await axios({
//         method: "POST",
//         url: "http://localhost:8000/send-otp",
//         data: {
//           phoneNumber,
//         },
//       });
//     } catch (ex) {
//       console.error(ex);
//     }
//   };

//   return (
//     <div className="pageContainer">
//       <div className="mainContainer">
//         <div className="titleContainer">Welcome !!!</div>
//         <div className="inputContainer">
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <InputText
//               keyfilter="int"
//               placeholder="Phone number"
//               className="inputBox"
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               style={{ marginRight: "10px" }}
//             />
//             <Button
//               label="Send OTP"
//               style={{
//                 width: "50px",
//                 height: "40px",
//                 fontSize: "12px",
//                 borderRadius: "10px",
//               }}
//               onClick={sendOtp}
//               className="p-button-success"
//             />
//           </div>
//         </div>
//         <div className="otpContainer">
//           <InputOtp
//             value={otp}
//             className="p-otpBox"
//             style={{ gap: "24px" }}
//             integerOnly
//             onChange={(e) => setOtp(e.value)}
//             length={6}
//           />
//         </div>
//         <label className="errorLabel">{otpError}</label>
//         <div className="inputContainer">
//           <Button
//             label="Submit"
//             className="inputButton"
//             type="button"
//             onClick={onLogin}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import "./Login.css";
import img1 from "./CustomerDetails/img/3.jpg";
import img2 from "./CustomerDetails/img/5.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { InputOtp } from "primereact/inputotp";
import { Button } from "primereact/button";

import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Login() {
  const [i0, setImg0] = useState(img1);
  const [i1, setImg1] = useState(img1);
  const [i2, setImg2] = useState(img1);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(); // OTP as an array of 5 digits
  const [otpError, setOtpError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    if (/^\d?$/.test(value)) {
      // Only allow numbers
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value && index < 4) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const onLogin = async (index, value) => {
    try {
      console.log(otp, phoneNumber);
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/login",
        data: {
          phoneNumber,
          otp,
        },
      });
      if (res.status === 200) {
        login("dummyToken");
        console.log("id = ", res);
        localStorage.setItem("userId", res?.data?.data?.id);
        const role = res?.data?.data?.role;
        localStorage.setItem("role", role);
        if (role === "Customer") navigate("/customer-details/profile");
        else if (role === "Agent") navigate("/agent/order");
        else if (role === "Admin") navigate("/admin/order");
      }
      console.log("---", login);
    } catch (ex) {
      console.error(ex);
    }
  };

  const sendOtp = async () => {
    // Combine the OTP array into a single string
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/send-otp",
        data: {
          phoneNumber,
        },
      });
    } catch (ex) {
      console.error(ex);
    }
  };

  // const click = () => {
  //   for (let i = 0; i < 20; i++) {
  //     let user = localStorage.getItem(`user${i}`);
  //     if (user === null) {
  //     } else {
  //       loginuser.push(JSON.parse(user));
  //     }
  //   }
  //   for (let i = 0; i < loginuser.length; i++) {
  //     const emailuser = loginuser[i].email[0];
  //     if (emailuser === email) {
  //       alert("user is already registered");
  //     } else {
  //     }
  //   }
  //   const data = {
  //     user: count,
  //     email: [],
  //     password: [],
  //   };
  //   console.log();
  //   data.email.push(email);
  //   data.password.push(password);
  //   let a = "@";
  //   let b = ".com";
  //   if (email == []) {
  //     alert("something went wrong");
  //   } else if (
  //     email.includes(a) &&
  //     email.includes(b) &&
  //     password.includes(password.toString())
  //   ) {
  //     localStorage.setItem(`user${count}`, JSON.stringify(data));
  //     alert("your data has been saved");
  //   } else {
  //     alert(a, "is required", b);
  //     alert("password is more then 8 characters less then 16 characters");
  //   }

  //   setemail("");
  //   setPassword("");
  //   setName("");

  //   setCount(count + 1);
  // };

  // useEffect(() => {
  //   setInterval(() => {
  //     setImg0(img2);
  //     setTimeout(() => {
  //       setImg0(img1);
  //     }, 500);
  //   }, 2000);
  //   setInterval(() => {
  //     setImg1(img2);
  //     setTimeout(() => {
  //       setImg1(img1);
  //     }, 1000);
  //   }, 2000);
  //   setInterval(() => {
  //     setImg2(img2);
  //     setTimeout(() => {
  //       setImg2(img1);
  //     }, 1500);
  //   }, 2000);
  // }, 1000);

  return (
    <>
      <div className="Login_body">
        <div className="Login_headline">
          <img src={i0} alt="" />
          <img src={i1} alt="" />
          <img src={i2} alt="" />
          <h1>Login to new Era of social media</h1>
        </div>
        <div className="Login_container">
          <di className="Login_all">
            <div className="Login_title">
              <h2 className="login">Login</h2>
            </div>

            <div className="Login_section">
              <div className="phon-block">
                <InputText
                  keyfilter="int"
                  placeholder="Phone number"
                  className="inputBox"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                <Button
                  label="Send OTP"
                  style={{
                    width: "85px",
                    height: "30px",
                    fontSize: "10px",
                    borderRadius: "10px",
                    backgroundColor: "#6b405f",
                  }}
                  onClick={sendOtp}
                  className="p-button-success"
                />
              </div>
              <div className="otpContainer">
                <InputOtp
                  value={otp}
                  className="p-otpBox"
                  style={{ gap: "12px" }}
                  integerOnly
                  onChange={(e) => setOtp(e.value)}
                  length={6}
                />
              </div>
              <label className="errorLabel">{otpError}</label>
              <br />
              <div className="inputContainer">
                <Button
                  label="Submit"
                  className="inputButton"
                  style={{
                    backgroundColor: "#6b405f",
                    borderRadius: "10px",
                    marginLeft: 100,
                  }}
                  type="button"
                  onClick={onLogin}
                />
              </div>
            </div>
          </di>
        </div>
      </div>
    </>
  );
}
