import React from "react";
import Titlebar from "../Titlebar/Titlebar";
import Footer from "../Footer/Footer";
import { useState, useRef } from "react";

export default function OTPVerify({
  numberOfDigits,
}: {
  numberOfDigits: number;
}) {
  const [otp, setOTP] = useState(new Array(numberOfDigits).fill(""));
  const otpBoxReference = useRef<any[]>([]);

  function handleChange(value: number, index: number) {
    let newArr = [...otp];
    newArr[index] = value;
    setOTP(newArr);

    if (index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleClick() {
    let str = "";
    otp.map((index) => (str += index));
    console.log(str);
  }

  function handleBackspace(e: any, index : number) {
    if(e.key === "Backspace" && !e.target.value && index > 0){
        otpBoxReference.current[index - 1].focus()
      }
  }

  return (
    <>
      <Titlebar />
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
            {otp.map((digit, index) => (
              <input
                className="w-[80px] h-[80px] bg-gray-200 text-center text-[25px]"
                key={index}
                value={digit}
                maxLength={1}
                onChange={(e: any) => handleChange(e.target.value, index)}
                onKeyDown={(e)=> handleBackspace(e, index)}
                ref={(reference) =>
                  (otpBoxReference.current[index] = reference)
                }
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
              style={{borderRadius:"12px"}}
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
