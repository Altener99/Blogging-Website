import React from "react";
import { Formik, Form, Field } from "formik";
import { useMatch, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks";

function Auth() {
    const isRegister = useMatch('/register')
    const navigate = useNavigate();
    const { login } = useAuth();
    async function onSubmit(values, actions) {

        console.log('onsubmit', { values, actions })
        try {
            // api request to login or register

            const { data } = await axios.post(`http://localhost:3001/api/users${isRegister ? '' : '/login'} `, { user: values });

            //navigate the useer back to home page
            login(data.user);
            navigate('/');
        }
        catch (error) {
            console.error('Error whille oSubmit:', error);

            const {status, data} = error.response;

            if(status === 422)
                {
                    actions.setErrors(data.errors);
                }
        }

    }

    const loginInitialValues = { email: '', password: '' }
    return (
        <div className="auth-page">

            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign {isRegister ? 'up' : 'inn'}</h1>
                        <p className="text-xs-center">
                            <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Have ' : 'Need '}
                                an account?</Link></p>

                        <Formik
                            onSubmit={onSubmit}
                            initialValues={isRegister ? { ...loginInitialValues, username: '' } : loginInitialValues}
                        >
                            {() => (

                                <>
                                    {/* <FormErrors/> */}

                                    <Form>
                                        {isRegister &&
                                            <fieldset className="form-group">
                                                <Field
                                                    type='text'
                                                    name='username'
                                                    placeholder='Your Name'
                                                    className='form-control form-control-lg'
                                                />
                                            </fieldset>
                                        }


                                        <fieldset className="form-group">
                                            <Field
                                                type='email'
                                                name='email'
                                                placeholder='Email'
                                                className='form-control form-control-lg'
                                            />
                                        </fieldset>

                                        <fieldset className="form-group">
                                            <Field
                                                type='password'
                                                name='password'
                                                placeholder='Password'
                                                className='form-control form-control-lg'
                                            />
                                        </fieldset>

                                        <button type="submit" className="btn btnn-lg btn-primary pull-xs-right">
                                            Sign {isRegister ? 'up' : 'in'}
                                        </button>
                                    </Form>
                                </>

                            )}
                        </Formik>

                    </div>
                </div>
            </div>

        </div>

    )
}

export default Auth;