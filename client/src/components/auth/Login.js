import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import Sidebar from '../Sidebar';
import RightSide from '../RigtSide/RightSide';
import MainDash from '../MainDash/MainDash';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            alert("You have successfully logged in!");
        }
    }, [loggedIn]);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/login', credentials);
            console.log("response", response.data);
            if (response.status === 200 && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isAuth', true);
                setLoggedIn(true);
                navigate('/');
            } else {
                console.log('Unexpected response:', response.data);
                setErrors({ server: 'Unexpected response from server' });
            }
        } catch (error) {
            console.log("Error:", error);
            if (error.response && error.response.data && error.response.data.error) {
                setErrors({ server: error.response.data.error });
            } else {
                setErrors({ server: 'An error occurred. Please try again later.' });
            }
        }
    };

    return (
        <>
            <div className='login-container'>
                <div className='login-form'>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email: </label>
                        <input type='text' name='email' value={credentials.email} onChange={handleChange} required /><br />
                        <label htmlFor='password'>Password: </label>
                        <input type='password' name='password' value={credentials.password} onChange={handleChange} required /><br />
                        <button className='btn btn-primary' type="submit">Log in</button>
                        {errors.server && <p className="error">{errors.server}</p>}
                    </form><br />
                    <p>Don't have an account? <a href="/auth/register">Sign Up</a></p>
                </div>
            </div>
        </>
    );
};

export default Login;
