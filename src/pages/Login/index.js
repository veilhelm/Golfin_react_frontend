import React, { useEffect } from "react"
import "./Login.scss"
import Logo from "../../resources/logo_text.svg"
import LoginCard from "../../components/LoginCard"


const setUpLoginView = () =>{
    document.querySelector("body").classList.add("login-active")
}

const dismountLoginView = () =>{
    document.querySelector("body").classList.remove("login-active")
}
const snowDrops = () => {
    const drops = []
    for(let i = 0 ; i < 60; i ++){
        drops.push(<li key={i}></li>)
    }
    return drops.map( drop => drop)
}
 
export default function Login (){
    useEffect(()=>{
        setUpLoginView()
        return () => dismountLoginView()
    })

    return(
        <div className="login__container">
            <img className="login__title" src={Logo} alt="golfin-text-logo"></img>
            <LoginCard className="login__card"></LoginCard>
            <ul>
                {snowDrops()}
            </ul>
        </div>
    )
}