import React, { useEffect, useState } from "react"
import "./NavBar.scss"
import Logo from "../../resources/logo2.svg"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"


export default function NavBar ({className =""}) {
    const [windowWidth, setWidth] = useState(window.innerWidth)
    const isLogged = useSelector(state => state.userDataReducer.isLogged)
    const location = useLocation()

    const updateWidth = (e) => {
        setWidth(window.innerWidth)
    }
        
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
    })

    if(location.pathname ==="/"){
        return (
            <nav className={`navBar__web ${className}`}>
                <div className="nav_web-logo">
                    <img src={Logo}></img>
                    <h1>golfin</h1>
                </div>
                {!isLogged &&
                <div className="nav__web-links"> 
                    <a id="nav__link-login" href="/login">login</a>
                    <a id="nav__link-login" href="/login">sign Up</a>
                </div>
                }
            </nav>
        )
    }

    if(windowWidth >= 760){
        return (
            <nav className={`navBar__web ${className}`}>
                <div className="nav_web-logo">
                    <img src={Logo}></img>
                    <h1>golfin</h1>
                </div>
                {!isLogged &&
                <div className="nav__web-links"> 
                    <a id="nav__link-login" href="/login">login</a>
                    <a id="nav__link-login" href="/login">sign Up</a>
                </div>
                }
            </nav>
        )
    }
    return(
        <nav className={`navBar__app ${className}`}>
            <a id="nav__link-goals"  href="/goals">
                <i className="fas fa-award fa-2x"></i>
                <span>goals</span>
            </a>
            <a id="nav__link-profile"  href="/login">
                <i className="far fa-address-card fa-2x"></i>
                <span>profile</span>
            </a>
            <a id="nav__link-dashboard" href="/balance">
                <i className="fas fa-tachometer-alt fa-2x"></i>
                <span>balance</span>
            </a>
            <a id="nav__link-balance" href="/dashboard">
                <i className="fas fa-chart-pie fa-2x"></i>
                <span>dashboard</span>
            </a>
        </nav>
    )
}