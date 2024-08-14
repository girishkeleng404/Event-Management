import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useContext, useState } from 'react';
import { UserContext } from '../../UserContex';
import axios from 'axios';

export default function SignUp({ name, setEmail, setPassword, email, password, setOtpVerified }) {

    const [isVarified, setIsVarified] = useState(false)
    const [isInput, setIsInput] = useState(false)
    const [frontOTP, setFrontOTP] = useState('')
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user } = useContext(UserContext);

    const fetchOTP = async () => {
        try {
            await axios.post('/otpSend', { email, isVarified }).then((response) => {
                console.log(response)
            })
        } catch (error) {
            console.error('Error fetching order:', error.message);
        }


    }

    const fetchVarified = async () => {
        const response = await fetch(`/auth/verify-otp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, frontOTP }), // Send email and OTP to backend
        });
        const data = await response.json();
        if (data.success) {
            console.log(data)
            setOtpVerified(true);
            setSuccess('Verification successful.');
        } else {
            console.log(data)
            setError('Verification failed. Please check your OTP and try again.');
        }
    }





    const handleClick = () => {
        window.location.href = 'http://localhost:5173/auth/google';
    };


    return (
        <div className="flex flex-col gap-4 mx-auto">

            <h1 className='text-2xl font-semibold w-9/12 mx-auto'>Wellcom {name}</h1>
            <div className='w-9/12 mx-auto'>
                <div onClick={handleClick} className="my-4 flex gap-2 items-center border    rounded-xl border-gray-300 p-2 justify-center max-w-96 cursor-pointer">

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
                <button className='bg-primary py-2 px-4 rounded-lg' onClick={() => { fetchOTP(); setIsInput(true) }}>Get OTP</button>
                <input type="password" placeholder="password" className='max-w-96 mx-auto' onChange={(e) => setPassword(e.target.value)} />
                {isInput && (
                    <input type="text" placeholder="OTP" className='max-w-96 mx-auto' onChange={(e) => setFrontOTP(e.target.value)} />

                )}
                {error && !success && ( <div className="text-red-500">{error}</div>) }
                {success && <div className="text-green-500">{success}</div>}

                <button className='bg-primary py-2 px-4 rounded-lg' onClick={() => { fetchVarified() }}>Verify</button>

            </div>
        </div>
    )
}