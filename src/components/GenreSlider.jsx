import React from 'react'
import { musicGenres } from '../constants'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import play from '../assets/play.svg';

const GenreSlider = () => {
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
  return (
    <div className=' mt-10'>
        <h1 className=' text-3xl font-bold'>Genres</h1>
        <Carousel responsive={responsive}>
        {musicGenres.map((genre)=>(
           <div className='card relative shadow-lg lg:h-32 lg:w-40 md:h-28 md:w-36 h-24 w-32 rounded-xl mt-3 '>
           <img src={genre.bgImage} alt={genre.title} className='h-full w-full  object-cover mb-4 rounded-xl'/>
           <h3 className='absolute bottom-0 left-0 right-0 text-xl font-semibold p-4 text-white bg-black bg-opacity-50 rounded-b-lg'>
               {genre.title}
           </h3>
           <img src={play} className='absolute top-1/2 transform -translate-y-1/2 right-4 w-10 h-10'/>
       </div>
       
        ))}
        </Carousel>
    </div>
  )
}

export default GenreSlider