 
// import GoogleIcon from '@mui/icons-material/Google';
import { useContext, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserName from "./miniComponents/UserName";
import SignUp from "./miniComponents/signUp";
import { UserContext } from "../UserContex";
import FitbitIcon from '@mui/icons-material/Fitbit';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const {user}= useContext(UserContext)
    const {setUser}= useContext(UserContext)
    const navigate = useNavigate(); 

    async function handleClick() {
        // e.preventDefault();
        console.log(name, email, password);
        try {
           const {data} = await axios.post('/register', { name, email, password });
            setUser(data);
            console.log(data+"register chekc");
            console.log(data.id + "register chekc")
             
            return data;
             
        } catch (error) {
            console.error("Registration failed:", error);
            
        }
    }

    async function handleButtonClick() {
        if (name) {
            setShow(true);
            // Add your additional function call here
            if (email && password) {
               const data = await handleClick();
               if(data){
                // navigate('/profileForm/'+data.id)
                setRedirect(true)
               }
                    
                }
            }
        }
    

if(redirect){
    // const dd = ``
    return <Navigate to={'/profileForm'}/>
}


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
                    <span> Already have an account? </span>
                    <Link to="/login" className="">
                        Sign in</Link>
                </div>


                <div className='w-5/12  backdrop-blur-xl '>
                  { !show && (
                     <UserName name={name} setName={setName} setShow={setShow}/>
                  )}
                   { show && name && (
                       <SignUp name={name} setEmail={setEmail} setPassword={setPassword}/>
                   )}
                  
                </div>
                <div className="absolute bottom-10 right-16  ">
                    {/* <div className="border-t border-gray-300 py-4 -mx-12"></div> */}
                    <span className=" text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint magnam, iste quae, illo eligendi deleniti inventore ex nulla dignissimos dolores !</span>
                    <Link  onClick={ handleButtonClick } className="bg-primary text-white px-3 py-2 my-2 rounded-md cursor-pointer ml-6 " >Sign up</Link>
                </div>
            </div>



        </div>

    )
}