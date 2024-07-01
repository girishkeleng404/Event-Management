
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();
  const kk = useLocation();
  // console.log(kk)

  function linkClasses(type = null) {
    let subPage = pathname.split('/')?.[2];
    console.log(subPage);
    if (subPage === undefined) {
      subPage = 'Home';
    }
    let classes = ' inline-flex gap-1 px-4 py-1 rounded-full';
    if (subPage === type) {
      return classes += 'block bg-yellow-100 rounded';
    }

    return classes;
  }
  return (
    <aside className="w-64 bg-white p-4 hidden sm:block">
      <ul>

        <Link to={'/Dashboard'} className={linkClasses("Home")}><a href="#" className="block py-2 px-4 rounded">Home</a></Link>
        <Link to={'/Dashboard/Orders'} className={linkClasses("Orders")}><a href="#" className="block py-2 px-4">Your Orders</a></Link>
        <Link to={'/Dashboard/Adds'} className={linkClasses("Adds")}><a href="#" className="block py-2 px-4">Your Adds</a></Link>
        <Link to={'/Dashboard/Cards'} className={linkClasses("Cards")}><a href="#" className="block py-2 px-4">Cards</a></Link>
        <Link  to={'/Dashboard/Address'}  className={linkClasses("Address")}><a href="#" className="block py-2 px-4">Address</a></Link>

        
      </ul>
    </aside>
  );
}

export default Sidebar;



