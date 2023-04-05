import "./RegisterForm.css"
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import registerUser from "../../services/registerUser";
import routes from "../../constants/routes";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const [step, setStep] = useState(0);
    const [errorPassword, setErrorPassword] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const handleNextStep = () => {
        // email, password, passwordRepeat
        // if (email || password || !passwordRepeat) {
        // if (!errors) {
            setStep(1)
        // }
        // 
    }

    const handleBackStep = () => {
        setStep(0);
    }

    if (success) {
        return (
            <div className="register-container">
                <h3>Register successful! You can now login.</h3>
                <Link className="link" to={routes.loginPage}><Button label="Login"></Button></Link>
            </div>

        );
    }

    return (
        <form onSubmit={handleSubmit(async (formData) => {
            if (formData.password !== formData.passwordRepeat) {
                setErrorPassword("Passwords must match!");
                return;
            }
            try {
                setLoading(true);
                await registerUser({
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    adress: formData.adress,
                    gender: formData.gender,
                    accept: formData.accept,
                    subscribe: formData.subscribe,
                });
                // padalinti i stepus
                setErrorPassword(null);
                setError(null);
                setSuccess(true);
            } catch (err) {
                setError("User already exists");
            }
            setLoading(false);
        })}>
            {step === 0 && (
                <div className="register-form">
                    <Heading title="Register" />
                    <Input name="email" type="email" placeholder="Email" register={{
                        ...register("email", {
                            required: "Email is Required",
                            pattern: {
                                message: "Invalid email address",
                            }
                        })
                    }} />
                    {errors.email && (<p className="text-danger">{errors.email.message}</p>)}
                    <Input name="password" type="password" placeholder="Password" register={{
                        ...register('password', {
                            required: "Password is Required",
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                                message: "Invalid password"
                            }
                        })
                    }}
                    />
                    {errors.password && (<p className="text-danger">{errors.password.message}</p>)}
                    <Input name="passwordRepeat" type="password" placeholder="Password repeat" register={{
                        ...register('passwordRepeat', {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                                message: "Invalid password"
                            }
                        })
                    }}
                    />
                    {errors.passwordRepeat && (<p className="text-danger">{errors.passwordRepeat.message}</p>)}
                    {errorPassword && (<p className="text-danger">{errorPassword}</p>)}
                    <Button label={loading ? "Loading..." : "Next"} type="button" onClick={handleNextStep} />
                </div>
            )}

            {step === 1 && (
                <div className="register-form" >
                    <Heading title="Register" />
                    {error && <h3 className="error">{error}</h3>}
                    <Input placeholder="First Name" name="firstName" type="text" disabled={loading ? true : false} register={{
                        ...register('firstName', {
                            required: "First Name is required"
                        })
                    }} />
                    {errors.firstName && (<p className="text-danger">{errors.firstName.message}</p>)}
                    <Input placeholder="Last Name" name="lastName" type="text" disabled={loading ? true : false} register={{
                        ...register('lastName', {
                            required: "Last name is required"
                        })
                    }} />
                    {errors.lastName && (<p className="text-danger">{errors.lastName.message}</p>)}
                    <Input placeholder="Adress" name="adress" type="text" disabled={loading ? true : false} register={{ ...register('adress') }} />
                    <select className="select" {...register("gender")}>
                        <option value="">Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                    <Input id="accept" label="I accept terms and conditions" name="accept" type="checkbox" disabled={loading ? true : false} register={{
                        ...register('accept', {
                            required: "Accept is required"
                        })
                    }} />
                    {errors.accept && (<p className="text-danger">{errors.accept.message}</p>)}
                    <Input id="subscribe" label="Subscribe to news letter" name="subscribe" type="checkbox" disabled={loading ? true : false} register={{ ...register('subscribe') }} />
                    <div className="buttons">
                        <Button label="Back" type="button" onClick={handleBackStep} />
                        <Button label={loading ? "Loading..." : "Submit"} type="submit" />
                    </div>
                </div>
            )}
        </form>
    )
}

export default RegisterForm;