import React, { useEffect, useState } from "react"
import { MorphicInput } from "../../components/Inputs"
import "./Register.scss"
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import MorphicButton from "../../components/morphicButton"
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const setUpRegisterView = () =>{
    document.querySelector("body").classList.add("Register-active")
}

const dismountRegisterView = () =>{
    document.querySelector("body").classList.remove("Register-active")
}

export default function Register () {
    const [files, setFiles] = useState([])

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
            <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxFiles={3}
            server="/api"
            name="files"
            labelIdle='drag a cool photo or <span class="filepond--label-action">search</span>'
            />
            <MorphicButton
                className="register__submit-btn"
            >submit</MorphicButton>
        </div>
    )
}