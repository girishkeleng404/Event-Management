import axios from "axios";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';

export default function PhotosUploader({ addedPhotos, onChange }) {

    const [photoLink, setPhotoLink] = useState("");

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/upload_by_link', { link: photoLink });
            console.log(data);
            onChange(prev => {
                return [...prev, data];
            })
            setPhotoLink('');
            console.log(addedPhotos);
        } catch (error) {
            console.error('Error uploading photo by link:', error);
        }
    }

    function uploadLocalPhoto(ev){
        ev.preventDefault();
        const selectedFiles = ev.target.files;
        console.log(selectedFiles);
        const formData = new FormData();
        for(let i= 0; i<selectedFiles.length;i++){
            formData.append('photos', selectedFiles[i]);
        }

        axios.post('/uploads',formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then(response=>{
            const {data:fileName} = response;
            console.log(fileName);
            onChange(prev=>{
                if(!prev){
                    return [fileName[0]];
                }
                return[...prev, fileName[0]];
            });
        })
    }


    function removePhoto(fileName, ev){
        ev.preventDefault();
        onChange([...addedPhotos.filter(photo=> photo!== fileName)])

    }
    function mainPhoto(fileName, ev){
        ev.preventDefault();
        onChange([fileName, ...addedPhotos.filter(photo => photo !== fileName)])

    }

    return (
        <div>

            <div className="flex gap-8">
                <input type="text"
                    value={photoLink}
                    onChange={ev => setPhotoLink(ev.target.value)} placeholder="Add using link  ......jpg" />
                <button onClick={addPhotoByLink} className="bg-primary text-white px-4 rounded-full">Add&nbsp;photo </button>
            </div>

            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-2 mt-4">

                {addedPhotos? addedPhotos.map((link, inx) => {
                    return(
                        <div key={inx} className="relative">
                            <button onClick={(ev)=>removePhoto(link,ev)}>
                                    <DeleteIcon className="absolute text-white bottom-1 right-1"/>
                            </button>
                   

                       <button onClick={(ev)=>mainPhoto(link,ev)}>
                        {link === addedPhotos[0]&& (
                          <StarIcon  className="absolute text-blue-400 bottom-1 left-1"/>
                       )}
                       {link !== addedPhotos[0]&& (
                        <StarIcon className="absolute text-white bottom-1 left-1"/>
                       )}
                       </button>
                       
                      
                       
                        <img
                            className="rounded-xl w-full h-48 object-cover"
                            src={`http://localhost:4000/uploads/${link}`}
                            alt={`uploaded-${inx}`}

                        />
                    </div>
                    )
                    
                }):null}

                <label className="h-48 cursor-pointer flex justify-center items-center gap-1 border bg-transparent rounded-2xl ">

                    <input type="file" multiple className="hidden" onChange={uploadLocalPhoto} />
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
                    Uploads
                </label>
            </div>


        </div>
    )
}