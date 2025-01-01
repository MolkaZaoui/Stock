import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createArticle.css';
import Sidebar from './Sidebar';

const CreateVendor= () => {
  const navigate = useNavigate();
  const [newVendor, setNewVendor] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setNewVendor({
      ...newVendor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi des données au serveur via une requête POST
      await axios.post('http://localhost:3000/api/fournisseur', newVendor);
      // Redirection vers la page des articles après la création réussie
      navigate('/vendors');
    } catch (error) {
      console.error('Error creating Vendors:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="container mt-5">
        <h1 className="mb-4">Create Vendors</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <div className="form-control">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={newVendor.reference}
                onChange={handleChange}
                required
                placeholder="Enter Name"
              />
            </div>
            <div className="form-control">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={newVendor.address}
                onChange={handleChange}
                required
                placeholder="Enter Address"
              />
            </div>
            <div className="form-control">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={newVendor.email}
                onChange={handleChange}
                required
                placeholder="Enter Your Email"
              />
            </div>
            <div className="form-control">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={newVendor.phone}
                onChange={handleChange}
                required
                placeholder="Enter Your Phone Number"
              />
            </div>
           
            <button className="custom-button" type="submit">
              Create Vendor
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateVendor;
