import { useState } from 'react';
import './SignUp.css'
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = (props) => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''

    })

    const [signUpMessage, setSignUpMessage] = useState('')
    const [signUpDone, setSignUpDone] = useState(false)

    const validate = () => {
        let validationErrors = {
            username: false,
            email: false,
            password: false,
            confirmPassword: false
        }
        if (formData.username.trim().length < 4) {
            validationErrors.username = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors, username: "Username should have at least 4 characters",
                }
            })
        } else if (!/^[^\s]*$/.test(formData.username.trim())) {
            validationErrors.username = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors, username: "Username shouldn't have empty characters",
                }

            })
        } else {
            validationErrors.username = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors, username: "",
                }
            })
        }

        if (!/^[A-Z0-9_.%+-]+@[A-Z0-9_.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
        ) {
            validationErrors.email = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: "The email is not valid",
                }
            })

        } else {
            validationErrors.email = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: "",
                }
            })
        }

        if (formData.password.trim().length < 6) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Password should have at least 6 characters",
                }
            })

        } else if (!/^[^\s]*$/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Password shouldn't have empty characters",
                }

            })
        } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Password must have at least one of characters: ! # @ & %",
                }
            })

        } else {
            validationErrors.password = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "",
                }
            })
        }

        if (formData.password.trim() !== formData.confirmPassword.trim()) {
            validationErrors.confirmPassword = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    confirmPassword: "Password must be the same",
                }
            })
        } else {
            validationErrors.confirmPassword = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    confirmPassword: "",
                }
            })
        }

        return (
            !validationErrors.username && !validationErrors.email && !validationErrors.password && !validationErrors.confirmPassword
        )
    }

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setFormData({
            ...formData,
            [name]: target.value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return
        }

        axios
            .post("https://akademia108.pl/api/social-app/user/signup", {
                username: formData.username,
                email: formData.email,
                password: formData.password,

            })
            .then((res) => {
                console.log(res.data)

                let resData = res.data;

                if (resData.signedup) {
                    setSignUpMessage("Account created")
                    setSignUpDone(true)
                } else {
                    if (resData.message.username) {
                        setSignUpMessage(resData.message.username[0])
                    } else if (resData.message.email) {
                        setSignUpMessage(resData.message.email[0])
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="container">
            {props.user && <Navigate to="/" />}
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <form onSubmit={handleSubmit}>
                {signUpMessage && <h2>{signUpMessage}</h2>}
                <div className="inputs">
                    <div className="input">
                        <input type="text" name="username" placeholder="User name" onChange={handleInputChange} />
                    </div>
                    {errors.username && <p>{errors.username}</p>}
                    <div className="input">
                        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                    </div>
                    {errors.email && <p>{errors.email}</p>}
                    <div className="input">
                        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                    </div >
                    {errors.password && <p>{errors.password}</p>}
                    <div className="input">
                        <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleInputChange} />
                    </div >
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    <button className="submit" disabled={signUpDone}>
                        Sign Up
                    </button>

                    {signUpDone && (<div>
                        <Link to="/login" className="submit">Go to login</Link>
                    </div>
                    )}
                </div>
            </form>
        </div >
    )
}

export default SignUp;