import React, { useEffect } from "react"
import { MorphicInput } from "../../components/Inputs"
import "./Register.scss"


const setUpRegisterView = () =>{
    document.querySelector("body").classList.add("Register-active")
}

const dismountRegisterView = () =>{
    document.querySelector("body").classList.remove("Register-active")
}

export default function Register () {
    useEffect(() =>{
        setUpRegisterView()
        return () => dismountRegisterView()
    })

    return(
        <div className="register__container">
            <label htmlFor="register__first-name">first name</label>
            <MorphicInput
            classname="register__first-name-input"
            id ="register__first-name"
            name ="register__first-name"
            placeHolder="first name"
            // value={}
            ></MorphicInput>
            <label htmlFor="register__last-name">last name</label>
            <MorphicInput
            classname="register__last-name-input"
            id ="register__last-name"
            name ="register__last-name"
            placeHolder="last name"
            // value={}
            ></MorphicInput>
            <label htmlFor="register__email">email</label>
            <MorphicInput
            className="register__email-input"
             id ="register__email"
            name ="register__email"
            placeHolder="email"
            // value={}
            ></MorphicInput>
            <label htmlFor="register__phone-number">phone number</label>
            <MorphicInput
            className="register__phone-number-input"
             id ="register__phone-number"
            name ="register__phone-number"
            placeHolder="phone-number"
            // value={}
            ></MorphicInput>
        </div>
    )
}