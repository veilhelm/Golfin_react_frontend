import React from "react"
import "./NavBar.scss"



export default function NavBar ({className}) {
    const handleSelected = (e) =>{
        console.dir(e.target.id)   
    }

    return(
        <nav className={`navBar ${className || ""}`}>
            <a id="nav__link-goals" onClick={e => handleSelected(e)} href="#">
                <i className="fas fa-award fa-2x"></i>
                <span>goals</span>
            </a>
            <a id="nav__link-profile" onClick={e => handleSelected(e)} href="/login">
                <i className="far fa-address-card fa-2x"></i>
                <span>profile</span>
            </a>
            <a id="nav__link-dashboard"onClick={e => handleSelected(e)} href="#">
                <i className="fas fa-tachometer-alt fa-2x"></i>
                <span>balance</span>
            </a>
            <a id="nav__link-balance"onClick={e => handleSelected(e)} href="#">
                <i className="fas fa-chart-pie fa-2x"></i>
                <span>dashboard</span>
            </a>
        </nav>
    )
}