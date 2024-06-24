import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function SignUp({ name, setEmail, setPassword }) {
    return (
        <div className="flex flex-col gap-4 mx-auto">

            <h1 className='text-2xl font-semibold w-9/12 mx-auto'>Wellcom {name}</h1>
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

            </div>
        </div>
    )
}