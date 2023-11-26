import React from 'react'
import { useEffect,useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
const Artist = () => {
    const [data, setData] = useState({ allArtists: [] });

    const getApi = async () => {
      try {
        const response = await axios.get(
          "https://musicaibackend-production.up.railway.app/artist"
        );
        setData(response.data);
        console.log(response.data);
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
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <div className='mt-8 mx-0'>
    <h2 className='mb-8 text-3xl font-bold'>Every Artist</h2>
    <Carousel responsive={responsive}>
      {data.allArtists &&
        data.allArtists.map((artist, index) => (
          <div key={index} className='card shadow-lg h-32 w-32 rounded-full'>
            <img
              src={artist.image}
              className='rounded-full h-full w-full object-cover'
              alt={`artist ${index + 1} image`}
            />
          </div>
        ))}
    </Carousel>
  </div>
  
  
  )
}

export default Artist