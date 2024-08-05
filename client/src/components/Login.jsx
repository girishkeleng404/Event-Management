 
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

        <div className="relative w-full grid grid-cols-[1fr_2fr] bg-gray-200 h-screen overflow-hidden">
            <video className="absolute  
            min-h-full w-screen m-auto" src="https://videos.pexels.com/video-files/11748996/11748996-uhd_2732_1440_30fps.mp4" autoPlay loop muted ></video>

            <div>
                
                <h1></h1>
            </div>

<Link to={'/'} className="absolute left-12 top-10">
    <FitbitIcon/>
</Link>
            <div className="z-10 h-screen flex flex-col justify-center items-center rounded-l-3xl backdrop-blur-2xl bg-white/50 ... ">
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