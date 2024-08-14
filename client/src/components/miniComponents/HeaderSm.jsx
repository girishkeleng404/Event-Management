

import FitbitIcon from '@mui/icons-material/Fitbit';

import MenuIcon from '@mui/icons-material/Menu';
import { UserContext } from '../../UserContex';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup'

const HeaderSm = () => {



  const { user, profile, ready } = useContext(UserContext);

   const [triggerEvent, setTriggerEvent] = useState('hover');
   

 
 useEffect(()=>{
  const updateTriggerEvent=()=>{
    const newTriggerEvent = window.innerWidth<768? 'click':'hover';
    setTriggerEvent(newTriggerEvent);
  };

  updateTriggerEvent();
  window.addEventListener('resize', updateTriggerEvent)

  return ()=> window.removeEventListener('resize', updateTriggerEvent)
 },[])

 if (!ready) {
  return <div>Loading...</div>;
}
  return (
    <header className="bg-gray-50 shadow p-4 flex items-center justify-between">

      <Link to={'/'} className="text-lg font-bold ml-12"> <FitbitIcon /> </Link>
      <Popup trigger={<button className="bg-white py-1 pr-1 pl-2 rounded-full flex gap-2 border border-gray-300 items-center mr-12">
        <MenuIcon />
        <img src={`http://localhost:4000/uploads/${profile.photos}`} alt="profile" className="h-8 w-8 rounded-full" />
      </button>} position={'bottom right'}
        on={triggerEvent}
        closeOnDocumentClick
        mouseLeaveDelay={200}
        mouseEnterDelay={300}
        contentStyle={{ padding: '8px 10px', border: 'none', background: 'gray' , borderRadius: 5, rowGap: 4, width:'10rem',  }}  >

        <div className='py-2 link-hover-effect'>
          <Link to={'/Dashboard'}>Home</Link>
        </div>
        <div className='py-2  link-hover-effect'>
          <Link to={'/Dashboard/Orders'}>Your Orders</Link>
        </div>
        <div className='py-2 link-hover-effect'>
          <Link to={'/Dashboard/Adds'}>Your Adds</Link>
        </div>
        <div className='py-2 link-hover-effect'>
          <Link to={'/Dashboard/Cards'}> Cards</Link>
        </div>
        <div className='py-2 link-hover-effect bg-'>
          <Link to={'/Dashboard/Address'}>Address</Link>
        </div>


      </Popup>

    </header>
  );

}

export default HeaderSm;



