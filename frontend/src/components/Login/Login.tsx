import React from "react";
import { useState } from "react";
import styles from "./page.module.css";
import TextField from "@mui/material/TextField";
import googleLogo from "./googleLogin.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [flag, setFlag] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const data = { userEmail: email, userPwd: password, userType: flag };

  function handleToggle() {
    setChecked(!checked);
    setFlag((prevFlag) => !prevFlag);
  }



  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
  };

  const submitBtnHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User logged in successful");
      } else {
        console.log("Unable to log in user");
      }
    } catch (error) {
      console.error("Error logging user:", error);
    }
  };

  function handleSignUp() {
    navigate("/signUp");
  }

  return (
    <div>
      {!flag ? (
        <>
          {" "}
          <Header />
          <div className="patient-bg">
            <div className={`main grid cols-4 justify-center items-center `}>
              <h1 className="font-bold ml-auto mr-auto mt-[50px] text-[34px] ">
                Login as Patient
              </h1>
              <div className={`login-form mt-[12.5px]`}>
                <form action="submit" method="post">
                  <div className="email ">
                    <h3 className="mb-[5px] font-semibold text-[16px]">
                      Email Address:
                    </h3>
                    <TextField
                      sx={{
                        "& .MuiInputBase-input": {
                          padding: "15px ",
                          backgroundColor: "white",
                          borderRadius: "10px",
                        },
                      }}
                      InputProps={{
                        style: {
                          borderRadius: "10px",
                          border: "1px solid black",
                          width: "280px",
                        },
                      }}
                      type="text"
                      name="email"
                      value={email}
                      placeholder="Enter your email address"
                      onChange={changeHandler}
                    
                      required
                    />
                  </div>
                  <div className="password mt-[7.5px]">
                    <h3 className="mb-[5px] font-semibold text-[16px]">
                      Password:
                    </h3>
                    <TextField
                      className="p-[13px]"
                      sx={{
                        "& .MuiInputBase-input": {
                          padding: "13.5px",
                          backgroundColor: "white",
                          borderRadius: "10px",
                        },
                      }}
                      InputProps={{
                        style: {
                          borderRadius: "10px",
                          border: "1px solid black",
                          width: "280px",
                        },
                      }}
                      type="password"
                      name="password"
                      placeholder="* * * * * * * * *"
                      onChange={passwordChangeHandler}
                    />
                  </div>
                  <div className={`grid justify-center mt-[10px]`}>
                    <button
                      className={`hover:text-black hover:font-bold mt-[20px] p rounded-full pt-[10px] pb-[10px] pl-[100px] pr-[100px] bg-submit-btn w-[275px] font-semibold text-white`}
                      type="submit"
                      onClick={submitBtnHandler}
                    >
                      Sign In
                    </button>

                    <div className="flex justify-end ">
                      <a
                        href="#"
                        className="hover:text-white hover:font-bold text-black  font-medium mt-4 mr-3"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="flex justify-center gap-2 mt-3">
                      <p>Don't have an account?</p>
                      <button
                        onClick={handleSignUp}
                        className="w-[60px] text-[15px] text-center font-semibold hover:text-white hover:font-bold"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <hr />
            <div className="flex justify-center gap-10 mt-8 h-[165px] items-center">
              <h1 className="font-bold text-[18px] tracking-wider ">
                Doctor Login
              </h1>
              <div>
                <div className={styles["toggle-slider"]}>
                  <input
                    type="checkbox"
                    id="toggle"
                    checked={checked}
                    onChange={handleToggle}
                  ></input>
                  <label htmlFor="toggle" className={styles.slider} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <div className="patient-bg">
            <div className={`main grid cols-4 justify-center items-center `}>
              <h1 className="font-bold ml-auto mr-auto mt-[50px] text-[34px] ">
                Login as Doctor
              </h1>
              <div className={`login-form mt-[12.5px]`}>
                <form action="submit" method="post">
                  <div className="email ">
                    <h3 className="mb-[5px] font-semibold text-[16px]">
                      Email Address:
                    </h3>
                    <TextField
                      sx={{
                        "& .MuiInputBase-input": {
                          padding: "15px ",
                          backgroundColor: "white",
                          borderRadius: "10px",
                        },
                      }}
                      InputProps={{
                        style: {
                          borderRadius: "10px",
                          border: "1px solid black",
                          width: "280px",
                        },
                      }}
                      type="text"
                      name="email"
                      value={email}
                      placeholder="Enter your email address"
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="password mt-[7.5px]">
                    <h3 className="mb-[5px] font-semibold text-[16px]">
                      Password:
                    </h3>
                    <TextField
                      className="p-[13px]"
                      sx={{
                        "& .MuiInputBase-input": {
                          padding: "13.5px",
                          backgroundColor: "white",
                          borderRadius: "10px",
                        },
                      }}
                      InputProps={{
                        style: {
                          borderRadius: "10px",
                          border: "1px solid black",
                          width: "280px",
                        },
                      }}
                      type="password"
                      name="password"
                      placeholder="* * * * * * * * *"
                      onChange={passwordChangeHandler}
                    />
                  </div>
                  <div className={`grid justify-center mt-[10px]`}>
                    <button
                      className={`hover:text-black hover:font-bold mt-[20px] p rounded-full pt-[10px] pb-[10px] pl-[100px] pr-[100px] bg-submit-btn w-[275px] font-semibold text-white`}
                      type="submit"
                      onClick={submitBtnHandler}
                    >
                      Sign In
                    </button>

                    <div className="flex justify-end ">
                      <a
                        href="#"
                        className="hover:text-white hover:font-bold text-black  font-medium mt-4 mr-3"
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <div className="flex justify-center gap-2 mt-3">
                      <p>Don't have an account?</p>
                      <button
                        onClick={handleSignUp}
                        className="w-[60px] text-[15px] text-center font-semibold hover:text-white hover:font-bold"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <hr />
            <div className="flex justify-center gap-10 mt-8 h-[165px] items-center">
              <h1 className="font-bold text-[18px] tracking-wider ">
                Doctor Login
              </h1>
              <div>
                <div className={styles["toggle-slider"]}>
                  <input
                    type="checkbox"
                    id="toggle"
                    checked={checked}
                    onChange={handleToggle}
                  ></input>
                  <label htmlFor="toggle" className={styles.slider} />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
