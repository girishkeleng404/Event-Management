import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { useContext, useState } from "react";
import axios from "axios";

import { Navigate } from "react-router-dom"; 
import { UserContext } from "../../UserContex";

export default function ComLogin() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [error, setError] = useState('');
    const [password, setPassword] = useState('')
    const { setUser } = useContext(UserContext)
    const { user } = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

   async function handleClick(e) {
        e.preventDefault()
        // console.log(name, email, password)
        try{
       const {data} = await axios.post('/login', { name, email, password })
    //    const dd = JSON.stringify(data)
       setUser(data)
       console.log(data+"login")
        setRedirect(true)
        }catch(err){
            setError('Login failed. Please check your credentials and try again.');
            console.log(err)
        }
       
        // .then(response=>{
        //     // console.log(response.data);
        //     setUser(response.data);
        //     // console.log(setUser)
        //     setRedirect(true);
        // })

        // .catch(error=>{
        //     console.log(error);
        //     setError('Login failed. Please check your credentials and try again.');
        // })
    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }
    return (
        <div className="flex flex-col gap-4 mx-auto">
    {error && <div className="text-red-500">{error}</div>}
            <h1 className='text-2xl font-semibold w-9/12 mx-auto'>Wellcome Back</h1>
            <div className='w-9/12 mx-auto'>
                <div className="my-4 flex gap-2 items-center border    rounded-xl border-gray-300 p-2 justify-center max-w-96">

                    <GoogleIcon />
                    <h1>Continue with Google</h1>
                </div>
                <div className="my-4 flex gap-2 items-center border   rounded-xl border-gray-300 p-2 justify-center max-w-96">

                    <FacebookIcon />
                    <h1>Continue with Facebook</h1>
                </div>
                <div className="my-4 flex gap-2 items-center border  rounded-xl border-gray-300 p-2 justify-center max-w-96">
                    <AppleIcon />

                    <h1>Continue with Apple</h1>
                </div>
            </div>

            <div className='flex gap-2 items-center w-9/12 mx-auto'>
                <span className='border border-gray-200 flex-1'></span>
                <h1>or</h1>
                <span className='border border-gray-200 flex-1'></span>
            </div>

            <div className='mx-auto w-9/12'>




                <input type="text" placeholder="email" className='max-w-96 mx-auto' onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" className='max-w-96 mx-auto' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={ handleClick} className="bg-primary text-white px-3 py-2 my-2 rounded-md cursor-pointer ">Login</button>

            </div>
        </div>
    )
}