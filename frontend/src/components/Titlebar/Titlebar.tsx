import React from 'react'
import Logo from "./Logo.png"


export default function Titlebar() {
  return (
    <div className="navbar">
        <img className="logo" src={Logo} alt="Logo" />
      </div>
  )
}
