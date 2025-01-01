import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {
    const [info, setInfo] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (info.password !== info.repeatPassword) {
                setErrors({ passwordMatch: 'Passwords do not match.' });
                return;
            }
    
            const response = await axios.post('http://localhost:3000/api/register', info);
            console.log("response", response.data);
            if (response.status === 201) {
                setSuccessMessage('Registration successful. Redirecting to login...');
                setTimeout(() => navigate('/auth/login'), 2000); // Navigate after 2 seconds
            } else {
                setErrors({ server: 'An error occurred. Please try again later.' });
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.error) {
                setErrors({ server: error.response.data.error });
            } else {
                setErrors({ server: 'An error occurred. Please try again later.' });
            }
        }
    };

    return (
        <div className='register-container'>
            
            <div className='register-form'>
                <h2>Register</h2>
                {successMessage && <p className="success">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Username</label>
                        <input type='text' placeholder='Enter your username' name="username" id="username" onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input type='text' placeholder='Enter your email' name="email" id="email" onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <label>Password</label>
                        <input type='password' placeholder='Enter your password' name="password" id="password" onChange={handleChange} required />
                    </div>
                    <div className='form-group'>
                        <label>Repeat password</label>
                        <input type='password' placeholder='Repeat your password' name="repeatPassword" id="repeatPassword" onChange={handleChange} required />
                        {errors.passwordMatch && <p className="error">{errors.passwordMatch}</p>}
                    </div>
                    <button className='btn btn-primary1' type='submit'>Register</button>
                    {errors.server && <p className="error">{errors.server}</p>}
                </form>
            </div>
        </div>
    );
};

export default Register;
