import React from 'react'
import { useEffect,useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from 'react-router-dom';
const Artist = () => {
    const [data, setData] = useState({ allArtists: [] });
    const [loading,setLoading]=useState(true)

    const getApi = async () => {
      try {
        const response = await axios.get(
          "https://musicailbackend.onrender.com/artist"
        );
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      getApi();
    }, []);
    
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  {if(loading){
    return(
      <div className=' mt-8 grid grid-cols-2'>
      <div className="skeleton w-32 h-32 rounded-full"></div>
      <div className="skeleton w-32 h-32 rounded-full ml-5"></div>
      </div>
    )
  }}
  return (
    <div className='mt-8 mx-0'>
    <h2 className='mb-8 text-3xl font-bold'>Every Artist</h2>
    <Carousel responsive={responsive}
    removeArrowOnDeviceType={["tablet", "mobile"]}
    >
      {data.allArtists &&
        data.allArtists.map((artist, index) => (
          <Link to={`artist/${artist.id}`} >
          <div key={index} className='card shadow-lg h-32 w-32 rounded-full'>
           
            <img
              src={artist.image}
              className='rounded-full h-full w-full object-cover'
              alt={`artist ${index + 1} image`}
            />
         
          </div>
          </Link>
        ))}
    </Carousel>
  </div>
  
  
  )
}

export default Artist