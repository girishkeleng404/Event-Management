 import { Route, Routes } from 'react-router-dom'

import './App.css'
import Layout from './Layout'
import IndexPage from './components/IndexPage'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import ProfileForm from './components/ProfileForm';
import Dashboard from './components/Dashboard';
import Order from './components/Orders';
import Adds from './components/Adds';
 
import Cards from './components/Cards';
import Address from './components/Address';

function App() {

 axios.defaults.baseURL = 'http://localhost:4000';
 axios.defaults.withCredentials = true;

  return (
    
    
    <Routes>
     <Route path='/' element={<Layout/>}/>
     <Route path='/:name' element={<Layout/>}/>
     <Route index element={<IndexPage/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/profileForm' element={<ProfileForm/>}/>
     <Route path='/profileForm/:id' element={<ProfileForm/>}/>
     <Route path='/Dashboard' element={<Dashboard/>}/>
     <Route path='/Dashboard/Orders' element={<Order/>}/>
     <Route path='/Dashboard/Adds' element={<Adds/>}/>
     <Route path='/Dashboard/Cards' element={<Cards/>}/>
     <Route path='/Dashboard/Address' element={<Address/>}/>
 
    </Routes>
 
    
  )
}

export default App
