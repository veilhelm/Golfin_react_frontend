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
import { useHistory } from "react-router-dom"
import { postRegisterUser } from "./Register.http"
import Swal from "sweetalert2"


  

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
    password: Yup.string().required("required field"),
    email: Yup.string().email().typeError('please provide a vaild email').required("required field"),
    phoneNumber: Yup.number().typeError('please provide a valid phone number').test('len', 'Must be exactly 10 characters', val => val && val.toString().length === 10 )
})

export default function Register () {
    const [photo, setPhoto] = useState([])
    const dispatch = useDispatch()
    const history = useHistory()

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

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
          history.push("/balance")
        }
      })

    const handleSubmit = async values =>{
        // values.photo = photo[0].file
        values.photo = "someUserPhoto"
        try {
            const user = await postRegisterUser(values)
            dispatch(changeUserFirstName(values.firstName))
            dispatch(changeUserIsLogged(true))
            dispatch(changeUserPhoto(values.photo))
            localStorage.setItem("token",user.data.tokens[0])
            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
              })
        } catch (error) {
            if(error.response.status === 400 ) Swal.fire('opps!', `${error.response.data.message}`, 'error')
            else Swal.fire('opps!', 'we couldn´t connect to the server, please make sure you are connected to the internet and try again', 'error')    
        }
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

                    <label htmlFor="register__password">create password</label>
                    <MorphicInput
                    className="register__password-input"
                    id ="register__password"
                    name ="register__password"
                    placeHolder="password"
                    type="password"
                    onChange={handleChange(setValues, values, "password")}
                    value={values.password}
                    ></MorphicInput>
                    {errors.password ? (
                    <p className="register__error">{errors.password}</p>
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
                        type="submit"
                        id="register__submit-btn"
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