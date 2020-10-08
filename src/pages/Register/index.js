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
import { useDispatch } from "react-redux"
import { changeUserFirstName, changeUserIsLogged, changeUserPhoto } from "../../reducers/userDataReducer.actions"

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const setUpRegisterView = () =>{
    document.querySelector("body").classList.add("Register-active")
}

const dismountRegisterView = () =>{
    document.querySelector("body").classList.remove("Register-active")
}

const formSchema = Yup.object().shape({
    firstName: Yup.string().required("required field"),
    lastName: Yup.string().required("required field"),
    email: Yup.string().email().typeError('please provide a vaild email').required("required field"),
    phoneNumber: Yup.number().typeError('please provide a valid phone number').test('len', 'Must be exactly 10 characters', val => val && val.toString().length === 10 )
})

export default function Register () {
    const [photo, setPhoto] = useState([])
    const dispatch = useDispatch()

    useEffect(() =>{
        setUpRegisterView()
        return () => dismountRegisterView()
    })

    const snowDrops = () => {
        const drops = []
        for(let i = 0 ; i < 60; i ++){
            drops.push(<li className="snow-drop" key={i}></li>)
        }
        return drops.map( drop => drop)
    }

    const handleSubmit = values =>{
        values.photo = photo[0].file
        console.log(values)
        dispatch(changeUserFirstName(values.firstName))
        dispatch(changeUserIsLogged(true))
        dispatch(changeUserPhoto(values.photo))
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
                initialValues={{...photo}}
                onSubmit={handleSubmit}
                validationSchema={formSchema}
            > 
                {({handleSubmit, values, setValues, errors, touched }) => ( 
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
                    {errors.firstName ? (
                    <p className="register__error">{errors.firstName}</p>
                    ) : null}

                    <label htmlFor="register__last-name">last name</label>
                    <MorphicInput
                    className="register__last-name-input"
                    id ="register__last-name"
                    name ="register__last-name"
                    placeHolder="last name"
                    onChange={handleChange(setValues, values, "lastName")}
                    value={values.lastName}
                    ></MorphicInput>
                    {errors.lastName ? (
                    <p className="register__error">{errors.lastName}</p>
                    ) : null}

                    <label htmlFor="register__email">email</label>
                    <MorphicInput
                    className="register__email-input"
                    id ="register__email"
                    name ="register__email"
                    placeHolder="email"
                    onChange={handleChange(setValues, values, "email")}
                    value={values.email}
                    ></MorphicInput>
                    {errors.email ? (
                    <p className="register__error">{errors.email}</p>
                    ) : null}
                    
                    <label htmlFor="register__phone-number">phone number</label>
                    <MorphicInput
                    className="register__phone-number-input"
                    id ="register__phone-number"
                    name ="register__phone-number"
                    placeHolder="phone-number"
                    onChange={handleChange(setValues, values, "phoneNumber")}
                    value={values.phoneNumber}
                    ></MorphicInput>
                    {errors.phoneNumber ? (
                    <p className="register__error">{errors.phoneNumber}</p>
                    ) : null}

                    <FilePond
                    files={photo}
                    onupdatefiles={files => setPhoto(files)}
                    allowMultiple={false}
                    allowReplace={true}
                    name="files"
                    labelIdle='drag a cool photo or <span class="filepond--label-action">search</span>'
                    />
                    {photo.length !==0 && <div style={{height:150}}></div>}
                    <MorphicButton
                        className="register__submit-btn"
                    >
                        submit
                    </MorphicButton>
                    <a href="/login">already have an account?</a>
                    <ul>
                        {snowDrops()}
                    </ul>
                </Form>
                )}
                </Formik>
        </div>
    )
}