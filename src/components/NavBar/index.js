import React, { useEffect, useRef, useState } from "react"
import "./NavBar.scss"
import Logo from "../../resources/logo2.svg"
import { useSelector } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"


const changeNavOnScroll = (DOMelement) => {
    if(!DOMelement.current) return
    if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) DOMelement.current.classList.add('not-on-top')
    else DOMelement.current.classList.remove('not-on-top')
}

export default function NavBar ({className =""}) {
    const [windowWidth, setWidth] = useState(window.innerWidth)
    const isLogged = useSelector(state => state.userDataReducer.isLogged)
    const location = useLocation()
    const history = useHistory()
    const DOMnav = useRef()

    const updateWidth = (e) => {
        setWidth(window.innerWidth)
    }
        
    useEffect(() => {
        window.addEventListener('resize', updateWidth)
    })

    useEffect(()=>{
        window.onscroll = function(){
            changeNavOnScroll(DOMnav)
        }
    })

    if(location.pathname ==="/"){
        return (
            <nav ref={DOMnav} className={`navBar__web ${className}`}>
                <div onClick={()=> history.push("/")} className="nav_web-logo">
                    <img  src={Logo}></img>
                    <h1>golfin</h1>
                </div>
                {!isLogged &&
                <div className="nav__web-links"> 
                    <a id="nav__link-login" href="/login">login</a>
                    <a id="nav__link-login" href="/register">sign Up</a>
                </div>
                }
            </nav>
        )
    }

    if(windowWidth >= 760){
        return (
            <nav ref={DOMnav} className={`navBar__web ${className}`}>
                <div onClick={()=> history.push("/")} className="nav_web-logo">
                    <img  src={Logo}></img>
                    <h1>golfin</h1>
                </div>
                {!isLogged &&
                <div className="nav__web-links"> 
                    <a id="nav__link-login" href="/login">login</a>
                    <a id="nav__link-login" href="/register">sign Up</a>
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