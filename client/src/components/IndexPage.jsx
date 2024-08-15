import axios from "axios";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function IndexPage() {
  const [listingData, setListingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const listingsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/listingsIndex', {
          params: {
            page: currentPage,
            limit: listingsPerPage,
          },
          withCredentials: true,
        });
        setListingData(response.data.listings);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const nextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  const prevPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));

  return (
    <>
      <Layout />
      <div className="bg-slate-50 py-8">
        <div className="w-11/12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 lg:gap-12 lg:px-12 md:px-10 m-auto">
          {listingData.length > 0 && listingData.map((item, inx) => (
            <Link to={`/DetailsPage/${item.id}`} key={item.id || inx} className="flex flex-col">
              <div className="m-auto flex flex-col">
                <div>
                  {item.added_photos && (
                    <img className="w-10/12 aspect-square rounded-lg" src={`http://localhost:4000/uploads/${item.added_photos[0]}`} alt={`Photo of ${item.title}`} />
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
        <div className="flex justify-center mt-8 gap-4">
          {currentPage && currentPage >1 ? (
            <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-100 p-2 rounded-lg flex items-center">
              <ArrowBackIosIcon />
              {/* Previous */}
            </button>
          ) : null}
          <p className="bg-gray-100 p-2 rounded-lg flex items-center">Page {currentPage} of {totalPages}</p>

          <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-gray-100 p-2 rounded-lg flex items-center">
            {/* Next */}
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
