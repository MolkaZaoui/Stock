import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createArticle.css';
import Sidebar from './Sidebar';

const CreateArticle = () => {
  const navigate = useNavigate();
  const [newArticle, setNewArticle] = useState({
    reference: '',
    prix: '', 
    quantite: '',
    nom: '', 
    description: '',
  });

  const handleChange = (e) => {
    setNewArticle({
      ...newArticle,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/article/create', newArticle); 
      navigate('/article');
    } catch (error) {
      console.error('Error creating Article:', error.response.data.error); 
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <h1 className="mb-4">Create Article</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Reference</label>
            <input
              type="text"
              name="reference"
              value={newArticle.reference}
              onChange={handleChange}
              required
              placeholder="Enter Reference"
            />
          </div>
          <div className="form-control">
            <label>Price</label>
            <input
              type="text"
              name="prix" // Changed from 'price' to 'prix'
              value={newArticle.prix} // Changed from 'price' to 'prix'
              onChange={handleChange}
              required
              placeholder="Enter Price"
            />
          </div>
          <div className="form-control">
            <label>Quantity</label>
            <input
              type="text"
              name="quantite"
              value={newArticle.quantite}
              onChange={handleChange}
              required
              placeholder="Enter Quantity"
            />
          </div>
          <div className="form-control">
            <label>Name</label>
            <input
              type="text"
              name="nom" // Changed from 'name' to 'nom'
              value={newArticle.nom} // Changed from 'name' to 'nom'
              onChange={handleChange}
              required
              placeholder="Enter name"
            />
          </div>
          <div className="form-control">
            <label>Description</label>
            <textarea
              rows={3}
              name="description"
              value={newArticle.description}
              onChange={handleChange}
              required
              placeholder="Enter Description"
            />
          </div>
          <button className="custom-button" type="submit">
            Create Article
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateArticle;
