import { Link, useParams } from "react-router-dom";
import Header from "../Header";
import { UserContext } from "../UserContex";
import { useContext, useEffect, useState } from "react";
import axios from "axios";


import Footer from "../Footer";



export default function SearchPlace() {

    const [searchData, setSearchData] = useState([])
    const {searchText} = useParams();
    console.log(searchText)


      useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`/searchPlace/${searchText}`);
                console.log("Response Data:", response.data);
                setSearchData(response.data);
            } catch (error) {
                console.error("Error fetching search data:", error);
            }
        };

        fetchSearchResults();
    }, [searchText]);


    return (


        <div className="overflow-x-hidden h-screen relative">
            {!searchData ? <Header setSearchData={setSearchData} />: <Header/>}
            


            <div className="bg-slate-50 min-h-80 py-6">



                <div className="w-11/12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 lg:gap-12 px-12 m-auto">

                    {searchData && searchData.map((item, inx) => (
                        <Link to={`/DetailsPage/${item.id}`} key={item.id || inx} className="flex flex-col ">

                            <div className="m-auto flex flex-col ">


                                <div>
                                    {item.added_photos && (
                                        <img className="w-10/12 aspect-square rounded-lg " src={`http://localhost:4000/uploads/${item.added_photos[0]}`} alt={`Photo of ${item.title}`} />
                                    )}

                                </div>
                                <div className="text-gray-800">
                                    <h1 className="text-lg capitalize">{item.title}</h1>
                                    <h1 className="text-sm"> {item.type} </h1>
                                    <h1 className="text-sm"> {item.address} </h1>

                                </div>
                            </div>

                        </Link>

                    ))}
                </div>
            </div>

{/* <div className="sticky w-screen bottom-0"> */}
    <Footer />
{/* </div> */}
            

        </div>


    )
}