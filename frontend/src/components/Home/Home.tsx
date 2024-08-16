import React, { useEffect, useRef } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState } from "react";
import "../../index.css";
import dr from "./Dr.png";
import hospitalIMG from "./hospital.jpg";
import locationIcon from "./location.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { wrap } from "module";
import "../../index.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState(new Array());
  const [hospitals, setHospitals] = useState(new Array());
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Imphal, Manipur");
  const resultsBox = document.querySelector(".result-box")!;
  const inputBox = document.querySelector(".input-box")!;

  const cities = [
    "Imphal, Manipur",
    "Bangalore, Karnataka",
    "Chennai, Tamil Nadu",
    "Indore, Madhya Pradesh",
  ];

  const handleCityInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let result: string[] = [];
    let input = e.target.value;
    setCity(input);

    if (input.length) {
      result = cities.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
    }
    if (resultsBox !== null) {
      const content = result
        .map((list, index) => `<li id='li-${index}'>${list}</li>`)
        .join("");
      resultsBox.innerHTML = "<ul>" + content + "</ul>";
    }

    result.forEach((list, index) => {
      const listItem = document.getElementById(`li-${index}`);
      if (listItem) {
        listItem.addEventListener("click", () => {
          setCity(list);
          resultsBox.innerHTML = "";
        });
      }
    });

    if (!result.length) {
      resultsBox.innerHTML = "";
    }
  };

  function display(result: string[]) {
    const content = result.map((list) => {
      return "<li>" + list + "</li>";
    });
  }

  useEffect(() => {
    // Event handler function
    const handleClick = (e: any) => {
      const target = e.target;
      if (target.tagName !== "LI") {
        if (resultsBox) {
          if(resultsBox.innerHTML !== '' && resultsBox.innerHTML !== null){
           resultsBox.innerHTML = '';
          }
        }
      }
    };
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  },);

  async function getRequiredData() {
    try {
      const doctorResponse = await fetch("/topDoctors");
      const hospitalResponse = await fetch("/topHospitals");

      if (doctorResponse.ok) {
        const data = await doctorResponse.json();
        setDoctors(data.result);
      } else {
        console.error("Unable to get doctor data");
      }

      if (hospitalResponse.ok) {
        const data = await hospitalResponse.json();
        setHospitals(data.result);
      }
    } catch (error) {
      console.error("error while fetching required data", error);
    }
  }

  function handleSearchQuery(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    getRequiredData();
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <div>
        <div className="home-bg">
          <div className="grid justify-center h-full">
            <div className="mt-auto mb-auto text-center">
              <h1
                className=" font-bold text-[2.1rem] tracking-wide"
                style={{ color: "#200065" }}
              >
                Book Doctor Appointments Online
              </h1>
              <p
                className="font-medium text-[18px] mb-3"
                style={{ color: "#200065" }}
              >
                Enter symtpoms, doctor or hospital name to get started
              </p>
            </div>
            <div className="flex justify-center mt-[-85px] h-[45px] ">
              <div className="flex flex-col ">
                <div className="flex">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="bg-white h-[25px]"
                    style={{
                      padding: "10px",
                      paddingLeft: "35px",
                      borderTopLeftRadius: "25px",
                      borderBottomLeftRadius: "25px",
                    }}
                  />
                  <input
                    className="h-[45px] focus:outline-none"
                    type="text"
                    id="input-box"
                    autoComplete="off"
                    placeholder="City, state"
                    value={city}
                    onChange={handleCityInputOnChange}
                  />
                </div>
                <div className="result-box bg-white block"></div>
              </div>

              <input
                className=" w-[450px] h-[45px] drop-shadow focus:outline-none "
                style={{
                  padding: "10px",
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                }}
                onChange={handleSearchQuery}
                value={searchQuery}
                placeholder="Enter symptoms, doctor, hospital"
              />
              <button
                className="ml-4 rounded-full  w-[90px] h-[45px] text-white font-semibold hover:font-bold"
                style={{
                  border: "2px solid #2F69FE",
                  background: "#2F69FE",
                  padding: "0px 20px",
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div
          className="grid justify-center"
          style={{ backgroundColor: "#f4fcff" }}
        >
          <div className="grid justify-center mb-5">
            <h1
              className="font-bold text-[26px] ml-auto mr-auto mt-[30px]"
              style={{ color: "#200065" }}
            >
              Top Doctors
            </h1>
            <p>Get treatment from these top doctors in your area</p>
          </div>
          <div>
            <div className="flex gap-[75px] mt-[25px]">
              {doctors.map((doctor) => (
                <div
                  key={doctor.doctorid}
                  className="grid grid-cols-1 justify-items-center h-[410px] w-[280px] mb-[30px] drop-shadow-md"
                  style={{ backgroundColor: "#cce6ff", padding: "10px" }}
                >
                  <img src={dr} className="rounded-full size-[125px] mt-3" />
                  <p
                    className="font-bold text-[16px]"
                    style={{ color: "#020068" }}
                  >{`Dr. ${doctor.name}`}</p>
                  <hr
                    className="mt-0 w-full"
                    style={{ height: "0px", border: "1.5px solid #99acbf" }}
                  />
                  <div className="grid justify-center">
                    <div className="flex justify-center">
                      <p className="mr-1">{doctor.qualifications} -</p>
                      <p>{doctor.special}</p>
                    </div>
                    <div className="flex justify-center">
                      <p
                        onClick={() => console.log("button was clicked")}
                        className="mr-1 hover:cursor-pointer hover:text-blue-600 hover:underline"
                      >
                        {doctor.hospitalname} ,
                      </p>
                      <p>{doctor.location}</p>
                    </div>
                    <div className="flex gap-[35px] justify-center">
                      <p>{doctor.rating}</p>
                      <p>{doctor.reviews} reviews</p>
                    </div>
                  </div>
                  <button
                    className="font-medium text-white rounded-full w-[175px] mt-4 mb-4 hover:font-bold"
                    style={{ padding: "5px", backgroundColor: "#4700bb" }}
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
            <p
              className="font-semibold text-[16px] mb-[40px] hover:cursor-pointer hover:underline"
              style={{ color: "#2F8E8E" }}
            >
              See all doctors
            </p>
          </div>
        </div>
        <hr className="mt-[0px]"></hr>
        <div
          className="grid justify-center"
          style={{ backgroundColor: "#f4fcff" }}
        >
          <div className="grid justify-center mb-5">
            <h1
              className="font-bold text-[26px] ml-auto mr-auto mt-[30px]"
              style={{ color: "#200065" }}
            >
              Top Hospitals
            </h1>
            <p>Check out these top hospitals in your area</p>
          </div>
          <div>
            <div className="flex gap-[75px] mt-[25px] mb-[25px]">
              {hospitals.map((hospital) => (
                <div
                  key={hospital.hospitalid}
                  className=" drop-shadow-md grid grid-cols-1 justify-items-center h-[400px] w-[280px]"
                  style={{ backgroundColor: "#cce6ff", padding: "10px" }}
                >
                  <img
                    src={hospitalIMG}
                    className="rounded-full size-[125px] mt-3"
                  />
                  <p
                    className="font-bold text-[16px]"
                    style={{ color: "#020068" }}
                  >
                    {hospital.hospitalname}
                  </p>
                  <hr
                    className="mt-0 w-full"
                    style={{ height: "0px", border: "1.5px solid #99acbf" }}
                  />

                  <div className="text-center">
                    <p>{hospital.hospitaladdr}</p>
                    <p>{hospital.hospitalcity}</p>
                  </div>
                  <div className="flex gap-[35px]">
                    <p>{hospital.hospitalrating}</p>
                    <p>{hospital.hospitalreview} reviews</p>
                  </div>
                  <button
                    className="font-medium text-white rounded-full w-[180px] mt-3 mb-3 hover:font-bold"
                    style={{ padding: "6px", backgroundColor: "#4700BB" }}
                  >
                    View Clinic
                  </button>
                </div>
              ))}
            </div>
            <div>
              <p
                className="font-semibold text-[16px] mb-[40px] hover:cursor-pointer hover:underline"
                style={{ color: "#2F8E8E" }}
              >
                See all hospitals
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
