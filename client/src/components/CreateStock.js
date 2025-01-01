import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateStock.css';
import Sidebar from './Sidebar';

const CreateStock = () => {
  const navigate = useNavigate();
  const [newStock, setNewStock] = useState({
    produit: '',
    date_operation: '',
    quantite_entree: '',
    quantite_sortie: '',
    prix_achat: '',
    article: '',
    fournisseur: '',
  });

  const handleChange = (e) => {
    setNewStock({
      ...newStock,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/stock/create', newStock);
      navigate('/stock');
    } catch (error) {
      console.error('Error creating Stock:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <h1 className="mb-4">Create Stock</h1>
        <form onSubmit={handleSubmit}>
          
          <div className="form-control">
            <label>Product</label>
            <input
              type="text"
              name="produit"
              value={newStock.produit}
              onChange={handleChange}
              required
              placeholder="Enter Product"
            />
          </div>
          <div className="form-control">
            <label>Date Operation</label>
            <input
              type="text"
              name="date_operation"
              value={newStock.date_operation}
              onChange={handleChange}
              required
              placeholder="Enter Date Operation"
            />
          </div>
          <div className="form-control">
            <label>Quantity Entry</label>
            <input
              type="text"
              name="quantite_entree"
              value={newStock.quantite_entree}
              onChange={handleChange}
              required
              placeholder="Enter Quantity Entry"
            />
          </div>
          <div className="form-control">
            <label>Quantity Exit</label>
            <input
              type="text"
              name="quantite_sortie"
              value={newStock.quantite_sortie}
              onChange={handleChange}
              required
              placeholder="Enter Quantity Exit"
            />
          </div>
          <div className="form-control">
            <label>Purchase Price</label>
            <input
              type="text"
              name="prix_achat"
              value={newStock.prix_achat}
              onChange={handleChange}
              required
              placeholder="Enter Purchase Price"
            />
          </div>
          <div className="form-control">
            <label>Article ID</label>
            <input
              type="text"
              name="article"
              value={newStock.article}
              onChange={handleChange}
              required
              placeholder="Enter Article ID"
            />
          </div>
          <div className="form-control">
            <label>Vendors ID</label>
            <input
              type="text"
              name="fournisseur"
              value={newStock.fournisseur}
              onChange={handleChange}
              required
              placeholder="Enter Vendors ID"
            />
          </div>
          <button className="custom-button" type="submit">
            Create Stock
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateStock;
