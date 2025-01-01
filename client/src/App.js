import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Sidebar from './components/Sidebar';
import Article from './components/Article';
import Home from './components/Home';
import Fournisseur from './components/Fournisseur';
import Stock from './components/Stock';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';
import CreateVendor from './components/CreateVendors';
import CreateStock from './components/CreateStock';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/article' element={<Article/>}/>
            <Route path='/article/create' element={<CreateArticle/>}/>
            <Route path='/article/edit/:id' element={<EditArticle/>}/>
            <Route path='/vendors' element={<Fournisseur/>}/>
            <Route path='/vendors/create' element={<CreateVendor/>}/>
            <Route path='/stock' element={<Stock/>}/>
            <Route path='/stock/create' element={<CreateStock/>}/>
            <Route path='/user' element={<User/>}/>
            <Route path='/auth/login' element={<Login/>}/>
            <Route path='/auth/register' element={<Register/>}/>

            
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
