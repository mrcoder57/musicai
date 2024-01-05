import React from "react";
import { musicGenres } from "../constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import play from "../assets/play.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const GenreSlider = () => {
  const [loading, setLoading] = useState(true);
  const [data, setSongs] = useState([]);
  const getApi = async () => {
    try {
      const response = await axios.get(
        "https://musicaibackend-production.up.railway.app/artist"
      );
      setSongs(response.data);
      setLoading(false)
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
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  {
    if (loading) {
      return (
        <div className="mt-10">
          <h1 className=" text-3xl font-bold">Genres</h1>
          <Carousel responsive={responsive}>
            <div className=" skeleton lg:h-32 lg:w-40 md:h-28 md:w-36 h-24 w-32 rounded-xl mt-3"></div>
            <div className=" skeleton lg:h-32 lg:w-40 md:h-28 md:w-36 h-24 w-32 rounded-xl mt-3"></div>
            <div className=" skeleton lg:h-32 lg:w-40 md:h-28 md:w-36 h-24 w-32 rounded-xl mt-3"></div>
            <div className=" skeleton lg:h-32 lg:w-40 md:h-28 md:w-36 h-24 w-32 rounded-xl mt-3"></div>
          </Carousel>
        </div>
      );
    }
  }
  return (
    <div className=" mt-10">
      <h1 className=" text-3xl font-bold">Genres</h1>
      <Carousel responsive={responsive}
       removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {musicGenres.map((genre) => (
          <Link to={`/genres/${genre.title}`}>
            <div className="card relative shadow-lg lg:h-32 lg:w-40 md:h-28 md:w-36 h-24 w-32 rounded-xl mt-3 ">
              <img
                src={genre.bgImage}
                alt={genre.title}
            
                className="h-full w-full  object-cover mb-4 rounded-xl"
                draggable={false}
              />

              <h3 className="absolute bottom-[14.5px] left-0 right-0 text-xl font-semibold p-4 text-white bg-gray-600 opacity-40 rounded-b-lg">
                {genre.title}
              </h3>
              <img
                src={play}
                className="absolute top-1/2 transform -translate-y-1/2 right-4 w-10 h-10"
                draggable={false}
              />
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default GenreSlider;
