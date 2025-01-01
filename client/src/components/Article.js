// Article.js

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Article.css';
import Sidebar from './Sidebar';

const Article = () => {
    const [articles, setArticles] = useState([]);
    const [deleteMsg, setDeleteMsg] = useState(false);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/article');
            setArticles(response.data);
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    const deleteArticle = async (id) => {
        try {
            setDeleteMsg(true);
            await axios.delete(`http://localhost:3000/api/article/delete/${id}`);
            fetchArticles();
            
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="MainDash">
                <div className="flex">
                    <h1>Article list</h1>
                    <Link className="btn-primary" to="/article/create">Create Article</Link>
                </div>
                {deleteMsg && (
                    <div style={{ backgroundColor: '#34cd60', color: '#fff', padding: '10px', borderRadius: '5px' }}>
                        The Article was deleted successfully
                    </div>
                )}
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Reference</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article.id} className="list-group-item">
                                <td>{article.id}</td>
                                <td>{article.reference}</td>
                                <td>{article.prix}</td>
                                <td>{article.quantite}</td>
                                <td>{article.nom}</td>
                                <td>{article.description}</td>
                                <td>
                                    <button onClick={() => deleteArticle(article.id)} className="btn btn-danger">Delete</button>
                                    <Link to={`/article/edit/${article.id}`} className="btn-update ">Update</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Article;
