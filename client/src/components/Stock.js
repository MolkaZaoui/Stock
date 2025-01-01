import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar'
import './Stock.css';

const Stock = () => {
    const [stock, setStock] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/stock');
                if (response) {
                    setStock(response.data);
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
                <div className="flex">
                    <h1>Stock list</h1>
                    <Link className="btn-primary" to="/stock/create">Create Stock</Link>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ width: '0%' }}>Product</th>
                            <th style={{ width: '0%' }}>Fiche ID</th>
                            <th style={{ width: '0%' }}>Date Operation</th>
                            <th style={{ width: '0%' }}>Quantity Entry</th>
                            <th style={{ width: '0%' }}>Quantity Exit</th>
                            <th style={{ width: '0%' }}>Purchase Price</th>
                            <th style={{ width: '0%' }}>Article ID</th>
                            <th style={{ width: '0%' }}>Vendors ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stock.map((item) => (
                            <tr key={item.id}>
                                <td>{item.produit}</td>
                                <td>{item.id}</td>
                                <td>{item.date_operation}</td>
                                <td>{item.quantite_entree}</td>
                                <td>{item.quantite_sortie}</td>
                                <td>{item.prix_achat}</td>
                                <td>{item.article}</td>
                                <td>{item.fournisseur}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Stock;
