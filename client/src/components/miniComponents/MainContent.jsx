// import { UserContext } from "../../UserContex";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContex";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";


const MainContent = () => {
    const {user} = useContext(UserContext);
    const {profile} = useContext(UserContext)

   const [edit,setEdit]= useState(false)

  

    return (
        <div className="bg-white shadow rounded p-4 mb-4">

            <div className="flex items-center gap-8">
                <div>
                    <img src={`http://localhost:4000/uploads/${profile.photos}`} alt="" className="h-24 w-24 rounded-full" />
                    
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Hi, {user.name}</h2>
                    <p className="text-gray-600">buymeacoffee.com/ {user.email}</p>
                </div>
                <Link to={'/profileForm'} className="cursor-pointer" onClick={()=>setEdit(true)}>
                      <EditIcon/>
                </Link>
              
            </div>


            <div className="mt-4">
                <h3 className="text-lg font-semibold">Earnings</h3>
                <p className="text-3xl font-bold">$0</p>
                <div className="flex space-x-2 mt-2 text-sm">
                    <span className="bg-yellow-200 py-1 px-2 rounded">$0 Supporters</span>
                    <span className="bg-pink-200 py-1 px-2 rounded">$0 Membership</span>
                    <span className="bg-blue-200 py-1 px-2 rounded">$0 Extras</span>
                </div>
            </div>




            <div className="bg-white shadow rounded p-4">
                <h3 className="text-lg font-semibold">You don't have any supporters yet</h3>
                <p className="text-gray-600">Share your page with your audience to get started.</p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-white shadow rounded p-4">
                    <h4 className="font-semibold">Membership</h4>
                    <p>Monthly membership for your biggest fans and...</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h4 className="font-semibold">Shop</h4>
                    <p>Introducing Shop, the creative way to sell.</p>
                </div>
                <div className="bg-white shadow rounded p-4">
                    <h4 className="font-semibold">Exclusive posts</h4>
                    <p>Publish your best content exclusively for your...</p>
                </div>
            </div>



        </div>
    );
}

export default MainContent;
