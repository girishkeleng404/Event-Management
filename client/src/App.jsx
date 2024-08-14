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
 
import NewAds from './components/NewAds';
// import Profile from './components/miniComponents/ProtectedRoute';
import ComLogin from './components/miniComponents/comLogin';
import ProtectedRoute from './components/miniComponents/ProtectedRoute';
import DetailsPage from './components/DetailsPage';
import Footer from './Footer';
import ProfileHome from './components/displayProfile/ProfileHome';
import OrderDisplay from './components/miniComponents/orderDispay';
import OrderDetails from './components/orderDetails';
import SearchPlace from './components/SearchPlace';
 
import OrderInbox from './components/OrderInbox';
 
 
// import ProtectedRoute from './components/miniComponents/ProtectedRoute';

function App() {

 axios.defaults.baseURL = 'http://localhost:4000';
 axios.defaults.withCredentials = true;

  return (
    
    
    <Routes>
     <Route path='/' element={<Layout/>}/>
    
     <Route path="/" element={<ComLogin />} />
     <Route path='/:name' element={<Layout/>}/>
     <Route index element={<IndexPage/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
     
     <Route path='/profileForm' element={<ProfileForm/>}/>
     <Route path='/Dashboard' element={<Dashboard/>}/>
     <Route path='/Dashboard/Orders' element={<Order/>}/>
     <Route path='/Dashboard/Adds' element={<Adds/>}/>
     <Route path='/Dashboard/Cards' element={<Cards/>}/>
     <Route path='/Dashboard/orderInbox' element={<OrderInbox/>} />
     <Route path='/Dashboard/Adds/new' element={<NewAds/>}/>

     <Route path='/auth/google/callback' element={<ProtectedRoute/>}/>
     <Route path='Dashboard/Adds/:id' element={<NewAds/>}/>
     <Route path='/DetailsPage/:id' element={<DetailsPage/>}/>
     <Route path='UserProfile/:id' element={<ProfileHome/>}/>
     <Route path='/orderDetails/:id' element={<OrderDetails/>}/>
     <Route path='/search/:searchText' element={<SearchPlace/>}/>
     
    
    </Routes>
 
    
  )
}

export default App
