import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import MenuIcon from '@mui/icons-material/Menu';

import Register from './components/Register';
import Login from './components/Login';
import { UserContext } from './UserContex';
import axios from 'axios';

export default function Header() {
    const [check, setCheck] = useState(true);

    const { user } = useContext(UserContext)
    const { profile } = useContext(UserContext)
    console.log(user)



    const {setUser}= useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    async function handleClick() {
        try {
            axios.post('/logout');
            setRedirect('/');
            setUser('');

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex align-center justify-around my-4">
            <div className="flex gap-8 items-center">
                <h1 className="text-primary text-2xl">BookMyShow</h1>
                <input type="text" placeholder=" Search for movies, shows, actors" />
            </div>
            <div className=" flex gap-4 items-center">
                <div className="flex gap-1 items-center">
                    <h1>Location</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>

                </div>

                {/* <Register check={check} setCheck={setCheck} />   */}
                {!user && (<Link to="/register" className="bg-primary text-white px-3 py-1 rounded-md cursor-pointer">sign up</Link>)}
                {!user && <Link to="/login" className="bg-primary text-white px-3 py-1 rounded-md cursor-pointer">sign in</Link>}


                <Popup trigger={<div className='flex gap-2 items-center border border-gray-400 rounded-full p-1'>
                    {/* {user && <h1 className="text-primary">{user.name}</h1>} */}
                    {user && profile && <img src={`http://localhost:4000/uploads/${profile.photos}`} alt="profile" className="h-8 w-8 rounded-full" />}
                     <MenuIcon />
                </div>}
                
                position="bottom">
                    <div className='flex flex-col bg-gray-100 py-2 pl-2 pr-8 justify-start'>
                    <Link to={'/profile'}  className=" sm:top-8 sm:right-8  sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer   ">  profile
                    </Link>
                    <Link to={'/'} onClick={handleClick} className=" sm:top-8 sm:right-8  sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer   ">Logout</Link>
                    <Link to={'/Dashboard'}  className=" sm:top-8 sm:right-8  sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer   ">DashBoard</Link>
                    </div>
                    
                </Popup>









            </div>



        </div>
    )
}