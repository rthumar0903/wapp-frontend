import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputOtp } from "primereact/inputotp";
import { Button } from "primereact/button";

import { useAuth } from "../utils/AuthProvider";
import axios from "axios";
import "./Login.css";

const Login = () => {
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

  return (
    <div className="pageContainer">
      <div className="mainContainer">
        <div className="titleContainer">Welcome !!!</div>
        <div className="inputContainer">
          <div style={{ display: "flex", alignItems: "center" }}>
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
                width: "50px",
                height: "40px",
                fontSize: "12px",
                borderRadius: "10px",
              }}
              onClick={sendOtp}
              className="p-button-success"
            />
          </div>
        </div>
        <div className="otpContainer">
          <InputOtp
            value={otp}
            className="p-otpBox"
            style={{ gap: "24px" }}
            integerOnly
            onChange={(e) => setOtp(e.value)}
            length={6}
          />
        </div>
        <label className="errorLabel">{otpError}</label>
        <div className="inputContainer">
          <Button
            label="Submit"
            className="inputButton"
            type="button"
            onClick={onLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
