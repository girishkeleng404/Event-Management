import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import MenuIcon from '@mui/icons-material/Menu';

import FitbitIcon from '@mui/icons-material/Fitbit';

// import Register from './components/Register';
// import Login from './components/Login';
import { UserContext } from './UserContex';
import axios from 'axios';
import Location from './components/Location';
import SearchIcon from '@mui/icons-material/Search';
import Switch from './components/toggle/Switch';


export default function Header({ setSearchData }) {



    const navigate = useNavigate();

    const [check, setCheck] = useState(true);

    const { user } = useContext(UserContext)
    const { profile } = useContext(UserContext)
    // console.log(user)

    const { setUser } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

    const [searchText, setSearchText] = useState('')



    async function handleClick() {
        try {
            axios.post('/logout');
            setRedirect('/');
            setUser('');

        } catch (error) {
            console.log(error);
        }
    }




    async function searchPlaces() {
        try {
            // const response = await axios.get(`/searchPlace/${searchText}`);
            // console.log(response.data)
            navigate(`/search/${searchText}`)


        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="flex align-center justify-around py-4 bg-gray-100 ">

            <div className="flex gap-8 items-center mx-2">
                <Link to={'/'} className='flex items-center gap-2'>
                    <FitbitIcon />
                    {/* <h1 className="text-primary text-2xl">BookMyShow</h1> */}
                </Link>

                {/* <input type="text" placeholder=" Search for movies, shows, actors" /> */}
            </div>
            <div className=" flex gap-4 items-center">
                <div className="flex gap-1 items-center">
                    <div className='flex items-center bg-slate-200 rounded-full px-4  mx-2'>

                        <input
                            className='bg-inherit outline-none border-none'
                            type="text"
                            placeholder='search'
                            onChange={(ev) => setSearchText(ev.target.value)}
                            value={searchText}
                            onKeyDown={(ev) => {
                                if (ev.key === "Enter") {
                                    searchPlaces();
                                }
                            }}
                        />
                        <div className='cursor-pointer' onClick={searchPlaces} >
                            < SearchIcon />
                        </div>
                    </div>

                      <Location />

                    

                </div>

                {/* <Register check={check} setCheck={setCheck} />   */}
                {!user && (<Link to="/register" className="bg-primary text-white px-3 py-1 rounded-md cursor-pointer">sign up</Link>)}
                {!user && <Link to="/login" className="bg-primary text-white px-3 py-1 rounded-md cursor-pointer">sign in</Link>}


                <Popup trigger={<div className='flex gap-1 lg:gap-2 items-center border border-gray-400 rounded-full px-0.5 lg:p-1 justify-center mr-2'>
                    {/* {user && <h1 className="text-primary">{user.name}</h1>} */}
                    {user && profile && <img src={`http://localhost:4000/uploads/${profile.photos}`} alt="profile" className=" h-7 w-7 lg:h-8 lg:w-8 rounded-full" />}
                    <div className='text-md lg:text-2xl flex items-center'>
                       <MenuIcon fontSize=''/> 
                    </div>
                    
                </div>}

                    position="bottom">
                        
                    <div className='flex flex-col bg-gray-100 py-2 pl-2 pr-2 justify-start mr-32 mt-6 h-32 w-32 lg:w-48 bg-opacity-60 backdrop-blur-xl'>
                        {user ? (<Link to={'/Dashboard'} className=" sm:top-8 sm:right-8  sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer hover:bg-gray-200 transition-all duration-300 ">  profile
                        </Link>) : <Link className=" sm:top-8 sm:right-8  sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer  ">  profile
                        </Link>}

                        <Link to={'/'} onClick={handleClick} className=" sm:top-8 sm:right-8  sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer   hover:bg-gray-200 transition-all duration-300  ">Logout</Link>

                        {user ? (<Link to={'/Dashboard'} className=" sm:top-8 sm:right-8  sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer   hover:bg-white/30 transition-all duration-300  ">DashBoard</Link>) : <Link className=" sm:top-8 sm:right-8  sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer ">DashBoard</Link>}

                    </div>

                </Popup>
                <Switch/>








            </div>



        </div>
    )
}