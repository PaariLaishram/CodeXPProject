import React, { KeyboardEvent } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function OTPVerify() {
  const location = useLocation();

  const [otpValues, setOtpValues] = useState<(number | string)[]>([
    "",
    "",
    "",
    "",
  ]);

  const otpFieldsRef = useRef<any[]>([]);

  //when user enters an opt value
  const handleInput = (index: number, value: any) => {
    if (value.length > 1) {
      return;
    }

    if (value >= 0 && value <= 9) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      if (value.length === 1 && index < otpValues.length - 1) {
        otpFieldsRef.current[index + 1].focus();
      }
    }
  };

  // when user press backspace
  const handleBackspace = (e: KeyboardEvent, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
    }
    if (otpValues[index] !== "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = "";
      setOtpValues(newOtpValues);
      if (index > 0) {
        otpFieldsRef.current[index - 1].focus();
      }
    }
  };

  // when user clicks on verify button to verify otp
  async function handleClick() {
    let otpStr = "";

    {
      otpValues.map((otp) => (otpStr += otp));
    }
    location.state = { ...location.state, otp: otpStr };
    let data = location.state;

    console.log(data);
    try {
      const response = await fetch("/verify", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Verification Successful");
      } else {
        console.log("verification failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <Header />
      <div className="grid justify-center h-[527px]">
        <div>
          <div className="grid justify-center mt-[80px] mb-8">
            <h1 className="font-bold text-[28px] tracking-wider ml-auto mr-auto">
              Enter your verification code
            </h1>
            <p className="text-[16px] mt-3">
              We have sent a One-Time passcode to your email. Please enter it
              below{" "}
            </p>
          </div>
          <div className="flex gap-10 justify-center mb-5">
            {otpValues.map((value, index) => (
              <input
                className="w-[80px] h-[80px] bg-gray-200 text-center text-[25px]"
                name="otp1"
                type="text"
                autoComplete="off"
                value={value}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(e, index)}
                ref={(ref) => {
                  otpFieldsRef.current[index] = ref;
                }}
                tabIndex={1}
                maxLength={1}
                key={index}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <div className="flex justify-center gap-1 mb-10">
            <p>Didn't recieve OTP?</p>
            <button className="font-medium text-blue-500">Resend OTP</button>
          </div>

          <div className="flex justify-center mt-[70px]  ">
            <button
              onClick={handleClick}
              className="bg-submit-btn pt-5 pb-5 pl-10 pr-10 w-[270px] text-[18px] text-white font-medium hover:text-black hover:font-semibold"
              style={{ borderRadius: "12px" }}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
