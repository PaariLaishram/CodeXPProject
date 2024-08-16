import React from 'react'
import Logo from "./Logo.png"


export default function Header() {
  return (
    <div className="navbar" style={{backgroundColor:'#000A65'}}>
        <img className="logo" src={Logo} alt="Logo" />
      </div>
  )
}
