import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

const Songscards = () => {
    const [data, setData] = useState({ topArtists: [] });

  const getApi = async () => {
    try {
      const response = await axios.get(
        "https://musicaibackend-production.up.railway.app/artist/top"
      );
      setData(response.data);
    //   console.log(response.data.topArtists);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

//   console.log(typeof data);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className=" lg:w-[450px] h-[250px] w-[320px]">
    <Carousel responsive={responsive} showDots={true} infinite={true}>
      {data.topArtists &&
        data.topArtists.map((artist) => (
            <div className="card lg:w-full bg-base-100  h-[250px]  shadow-xl image-full">
            <figure><img src={artist.image} alt="Shoes" /></figure>
            <div className="card-body">
              <h2 className="card-title">{artist.username}</h2>
              <p>Listen to the top of the artist everyweek</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">listen Now</button>
              </div>
            </div>
          </div>
        ))}
    </Carousel>
    </div>
  );
};

export default Songscards;