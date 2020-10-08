import React, { useEffect, useState } from "react"
import { MorphicInput } from "../../components/Inputs"
import "./Register.scss"
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import MorphicButton from "../../components/morphicButton"
import { Formik, Form } from "formik"
import * as Yup from "yup"

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const setUpRegisterView = () =>{
    document.querySelector("body").classList.add("Register-active")
}

const dismountRegisterView = () =>{
    document.querySelector("body").classList.remove("Register-active")
}

export default function Register () {
    const [formData, setFormData] = useState({firstName:"", lastName:"", email:"", phoneNumber:"", photo: []})

    useEffect(() =>{
        setUpRegisterView()
        return () => dismountRegisterView()
    })

    const handleSubmit = values =>{
        console.log(values)
    }

    const handleChange = (setValues, values, field) =>{
        return (e)=> {
            values[field] = e.target.value
            setValues(values)
        }
    }

    return(
        <div className="register__container">
            <Formik
                initialValues={{...formData}}
                onSubmit={handleSubmit}
            >
                {({handleSubmit, values, setValues }) => ( 
                <Form onSubmit={handleSubmit}>
                    <h5>REGISTER</h5>
                    <label htmlFor="register__first-name">first name</label>
                    <MorphicInput
                    className="register__first-name-input"
                    id ="register__first-name"
                    name ="register__first-name"
                    placeHolder="first name"
                    onChange={handleChange(setValues, values, "firstName")}
                    value={values.firstName}
                    ></MorphicInput>
                    <label htmlFor="register__last-name">last name</label>
                    <MorphicInput
                    className="register__last-name-input"
                    id ="register__last-name"
                    name ="register__last-name"
                    placeHolder="last name"
                    onChange={handleChange(setValues, values, "lastName")}
                    value={values.lastName}
                    ></MorphicInput>
                    <label htmlFor="register__email">email</label>
                    <MorphicInput
                    className="register__email-input"
                    id ="register__email"
                    name ="register__email"
                    placeHolder="email"
                    onChange={handleChange(setValues, values, "email")}
                    value={values.email}
                    ></MorphicInput>
                    <label htmlFor="register__phone-number">phone number</label>
                    <MorphicInput
                    className="register__phone-number-input"
                    id ="register__phone-number"
                    name ="register__phone-number"
                    placeHolder="phone-number"
                    onChange={handleChange(setValues, values, "phoneNumber")}
                    value={values.phoneNumber}
                    ></MorphicInput>
                    <FilePond
                    files={formData.photo}
                    onupdatefiles={files => setFormData({...formData, photo: files})}
                    allowMultiple={false}
                    allowReplace={true}
                    name="files"
                    labelIdle='drag a cool photo or <span class="filepond--label-action">search</span>'
                    />
                    {formData.photo.length !==0 && <div style={{height:150}}></div>}
                    <MorphicButton
                        className="register__submit-btn"
                    >
                        submit
                    </MorphicButton>
                    <a href="/login">already have an account?</a>
                </Form>
                )}
                </Formik>
        </div>
    )
}