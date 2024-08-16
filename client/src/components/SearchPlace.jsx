import { Link, useParams } from "react-router-dom";
import Header from "../Header"; 
import {  useEffect, useState } from "react";
import axios from "axios";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import Footer from "../Footer";



export default function SearchPlace() {

    const [searchData, setSearchData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const listingsPerPage = 4;

    const { searchText } = useParams();
    console.log(searchText)


    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`/searchPlace/${searchText}`, {
                    params: {
                        page: currentPage,
                        limit: listingsPerPage,
                    }
                });
                console.log("Response Data:", response.data);
                setSearchData(response.data.listings);
                setTotalPages(response.data.totalPages)
            } catch (error) {
                console.error("Error fetching search data:", error);
            }
        };

        fetchSearchResults();
    }, [searchText, currentPage]);



    const nextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))

    return (


        <div className="overflow-x-hidden h-screen relative">
            {!searchData ? <Header setSearchData={setSearchData} /> : <Header />}



            <div className="bg-slate-50 min-h-80 py-6">



                <div className="w-11/12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 lg:gap-12 px-12 m-auto">

                    {searchData && searchData.map((item, inx) => (
                        <Link to={`/DetailsPage/${item.id}`} key={item.id || inx} className="flex flex-col ">

                            <div className="m-auto flex flex-col ">


                                <div>
                                    {item.added_photos && (
                                        <img className="w-10/12 aspect-square rounded-lg object-cover" src={`http://localhost:4000/uploads/${item.added_photos[0]}`} alt={`Photo of ${item.title}`} />
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

                <div className="flex items-center justify-center gap-4">
               
                    <button onClick={prevPage} disabled={currentPage === 1}  > <ArrowBackIosIcon /> </button>
                    <p> {currentPage} of {totalPages} </p>
                    <button className="" onClick={nextPage} disabled={currentPage === totalPages} > <ArrowForwardIosIcon /> </button>
                </div>
            </div>


            <Footer />



        </div>


    )
}