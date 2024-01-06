import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Songscards = () => {
    const [data, setData] = useState({ topArtists: [] });
    const [loading,setLoading]=useState(true)
  const getApi = async () => {
    try {
      const response = await axios.get(
        "https://musicailbackend.onrender.com/artist/top/top5"
      );
      setData(response.data);
      setLoading(false)
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
 {if(loading){
    return(
      <div className=' mt-8 grid grid-cols-2'>
      <div className="skeleton lg:w-[450px] h-[250px] w-[320px]"></div>
      </div>
    )
  }}
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
                <Link to={`/artist/${artist.id}`}>
                <button className="btn btn-primary">listen Now</button></Link>
              </div>
            </div>
          </div>
        ))}
    </Carousel>
    </div>
  );
};

export default Songscards;
