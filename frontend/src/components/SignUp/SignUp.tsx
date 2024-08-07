import React from "react";
import Titlebar from "../Titlebar/Titlebar";
import { Checkbox, TextField } from "@mui/material";
import Footer from "../Footer/Footer";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState();
  const [selectedValue, setSelectedValue] = useState("patient");

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSelectedValueChanged = (e: any) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      userName: name,
      userEmail: email,
      userPassword: password,
      userType: selectedValue,
    };

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration Successful");
      } else {
        console.log("Registration unsuccessful");
      }
    } catch (error) {
      console.error("Error encountered: ", error);
    }
  };

  return (
    <>
      <Titlebar />
      <div className="signUp-bg">
        <div className="grid justify-center">
          <div>
            <h1 className="font-bold text-[32px] text-center mt-[15px]">
              Sign Up
            </h1>

            <p className="text-[16px]">
              Please enter your details to get started.
            </p>
          </div>
          <div
            className="mb-1 grid justify-center"
            style={{ gridRowGap: "5px" }}
          >
            <form
              onSubmit={handleSubmit}
              style={{ display: "grid", justifyItems: "center" }}
            >
              <div className="mt-1 mb-1">
                <h3 className="font-semibold">Name: </h3>
                <input
                  onChange={handleNameChange}
                  className="pt-1 pb-1 pl-3 w-[225px] rounded-md"
                  style={{ padding: "10px" }}
                  type="text"
                  placeholder="John Doe"
                  value={name}
                ></input>
              </div>
              <div className="mt-1 mb-1">
                <h3 className="font-semibold">Email: </h3>
                <input
                  onChange={handleEmailChange}
                  className="pt-1 pb-1 pl-3 w-[225px] rounded-md"
                  style={{ padding: "10px" }}
                  type="text"
                  placeholder="example@gmail.com"
                  value={email}
                ></input>
              </div>
              <div className="mt-1 mb-1">
                <h3 className="font-semibold">Password:</h3>
                <input
                  onChange={handlePasswordChange}
                  type="password"
                  className="pt-1 pb-1 pl-3 w-[225px] rounded-md"
                  style={{ padding: "10px" }}
                  placeholder="At least 8 characters"
                  value={password}
                ></input>
              </div>
              <div>
                <h3 className="font-semibold" style={{ margin: "1px" }}>
                  Registration Type:
                </h3>
                <select
                  value={selectedValue}
                  onChange={handleSelectedValueChanged}
                  style={{ padding: "10px 80px", borderRadius: "8px" }}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>

              <div
                className="flex justify-center gap-[5px]"
                style={{ margin: "10px" }}
              >
                <input type="checkbox" name="terms" value="terms" />
                <label className="text-[12px]">
                  I agree to the terms and conditions
                </label>
              </div>
              <button
                className="hover:text-black hover:font-bold mt-[10px] p rounded-full pt-[10px] pb-[10px] pl-[100px] pr-[100px] bg-submit-btn w-[250px] font-medium text-white"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>

          <div style={{ margin: "10px", paddingBottom: "10px" }}>
            <p className="text-center">
              Already have an account?
              <a
                className="ml-2 font-medium text-blue-600 hover:underline"
                href="#"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
