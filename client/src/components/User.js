import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from './Sidebar'
import './Stock.css';

const User = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user');
                if (response) {
                    setUser(response.data); 
                }
            } catch (error) {
                console.error('Something went wrong!', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="MainDash">
                
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>Username</th>
                                <th style={{ width: '10%' }}>Email</th>
                                <th style={{ width: '10%' }}>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map((item) => ( 
                                <tr key={item._id}> {/* Corrected key attribute */}
                                    <td>{item.username}</td> {/* Corrected property names */}
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     
            </div>
        </>
    );
};

export default User;
