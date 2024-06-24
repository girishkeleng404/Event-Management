import axios from "axios";
import { useState } from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function PhotosUploader({photo,setPhoto }) {

    // const [selectedFile, setSelectedFile] = useState(null)

    async function handleChange(e) {

        // setSelectedFile(e.target.files)
        const selectedFile = e.target.files[0];
        console.log(selectedFile);


        const formData = new FormData();
        formData.append('profilePhoto', selectedFile);
        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            // const {data:fileName}= response;
            setPhoto(response.data.fileName)
            console.log(photo)
            console.log("file uploaded successfully", response.data)
        } catch (error) {
            console.log(error);
        }


    }


    return (
        <div className="flex flex-col gap-4">
            
                 <div className="rounded-full overflow-hidden flex items-center justify-center">
                    {!photo ? <AccountCircleIcon style={{fontSize:176}} className="  text-gray-800" /> : <img className="h-44 aspect-square" src={`http://localhost:4000/uploads/${photo}`} alt="img" />}
               
                  </div>
           

           <div>
             <label className="h-8 w-44 cursor-pointer flex justify-center items-center  gap-1  border bg-transparent rounded-2xl py-6 text-xl text-gray-500">
                <input type="file" className="hidden" onChange={handleChange} />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                    />
                </svg>
                Upload
            </label>
           </div>
           

        </div>
    )
}