import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'
import './Fournisseur.css';

const Fournisseur = () => {
    const [fournisseurs, setFournisseurs] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);

    const fetchFournisseurs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/fournisseur');
            setFournisseurs(response.data);
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };
    const DeleteFournisseur = async (id) => {
        try {
            setDeleteMsg(true);
            await axios.delete(`http://localhost:3000/api/fournisseur/${id}`);
            fetchFournisseurs();
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    useEffect(() => {
        fetchFournisseurs();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="MainDash">
                <div className="flex">
                    <h1>Vendors list</h1>
                    <Link className="btn-primary" to="/vendors/create">Create Vendors</Link>
                </div>
                {deleteMsg && (
                    <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px' }}>
                        The pVendors was deleted successfully
                    </div>
                )}
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {fournisseurs.map((fournisseur) => (
                            <tr key={fournisseur.id} className="list-group-item">
                                <td>{fournisseur.id}</td>
                                <td>{fournisseur.name}</td>
                                <td>{fournisseur.address}</td>
                                <td>{fournisseur.email}</td>
                                <td>{fournisseur.phone}</td>
                                <td>
                                    <button onClick={() => DeleteFournisseur(fournisseur.id)} className="btn btn-danger">Delete</button>
                                    {/* Ajoutez ici le bouton pour l'édition */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Fournisseur;
