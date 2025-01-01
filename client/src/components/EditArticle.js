import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 
import './createArticle.css';
import Sidebar from './Sidebar'; // Import Sidebar

const ArticleEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        reference: '',
        prix: '',
        quantite: '',
        nom: '',
        description: ''
    });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/article/${id}`)
                setArticle(response.data); 
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/article/edit/${id}`, article);
            navigate('/article');
        } catch (error) {
            console.error('Error updating article:', error);
        }
    };

    return (
        <>
            <Sidebar /> 
            <div className="container mt-5">
                <h1 className="mb-4">Edit Article</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label>Reference</label>
                        <input
                            type="text"
                            name="reference"
                            value={article.reference} 
                            onChange={handleChange}
                            required
                            placeholder="Enter Reference"
                        />
                    </div>
                    <div className="form-control">
                        <label>Price</label>
                        <input
                            type="text"
                            name="prix"
                            value={article.prix}
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
                            value={article.quantite}
                            onChange={handleChange}
                            required
                            placeholder="Enter Quantity"
                        />
                    </div>
                    <div className="form-control">
                        <label>Name</label>
                        <input
                            type="text"
                            name="nom"
                            value={article.nom}
                            onChange={handleChange}
                            required
                            placeholder="Enter Name"
                        />
                    </div>
                    <div className="form-control">
                        <label>Description</label>
                        <textarea
                            rows={3}
                            name="description"
                            value={article.description}
                            onChange={handleChange}
                            required
                            placeholder="Enter Description"
                        />
                    </div>
                    <button className="custom-button" type="submit">
                        Update Article
                    </button>
                </form>
            </div>
        </>
    );
};

export default ArticleEdit;
