import React from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-8/12">
        <div>
          <h2 className="text-lg font-bold mb-4">Support</h2>
          <ul >
            <li><a href="#" className="text-gray-600 hover:underline">Help Centre</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">AirCover</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Anti-discrimination</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Disability support</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Cancellation options</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Report neighbourhood concern</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Hosting</h2>
          <ul>
            <li><Link to={`/Dashboard/Adds`}  className="text-gray-600 hover:underline">List your home</Link></li>
            <li><a href="#" className="text-gray-600 hover:underline">AirCover for Hosts</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Hosting resources</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Community forum</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Hosting responsibly</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Join a free Hosting class</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Air</h2>
          <ul>
            <li><a href="#" className="text-gray-600 hover:underline">Newsroom</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">New features</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Careers</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Investors</a></li>
            <li><a href="#" className="text-gray-600 hover:underline">Air.org emergency stays</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-8 pt-8">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
          <div className="text-sm text-gray-600">&copy; 2024 Air, Inc. · Privacy · Terms · Sitemap · Company details</div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
          
            <FacebookIcon/>
            <XIcon/>
            <InstagramIcon/>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
