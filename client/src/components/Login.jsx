 
// import GoogleIcon from '@mui/icons-material/Google';
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SignUp from "./miniComponents/signUp";
import ComLogin from "./miniComponents/comLogin";
import FitbitIcon from '@mui/icons-material/Fitbit';
 


export default function Login() {

 
    const [show, setShow] = useState(false)




    return (

        <div className="relative w-full grid grid-cols-[1fr_2fr] bg-gray-200">
            <div>
                <h1></h1>
            </div>

<Link to={'/'} className="absolute left-12 top-10">
    <FitbitIcon/>
</Link>
            <div className=" h-screen flex flex-col justify-center items-center bg-white rounded-l-3xl">
                <div className="flex gap-2 absolute right-8 top-8">
                    <span> Don't have an account? </span>
                    <Link to="/register" className="">
                        Sign up</Link>
                </div>

          <ComLogin />
                
              
                  
                </div>
                
            </div>



         

    )
}