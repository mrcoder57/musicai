import React from "react";
import Songscards from "../components/Songscards";
import Songslist from "../components/Songslist";
import Artist from "../components/Artist";
import MusicPlayer from "../components/MusicPlayer";

const Hero = () => {
  return (
    <div>
    <div className=" mt-16 lg:mx-20 mx-10 grid gap-3 lg:grid-cols-2 md:grid-cols-1  grid-cols-1">
      <Songscards />
      <Songslist/>
      
    </div>
    <div className=" lg:mx-20 mx-10 lg:gap-5 grid grid-cols-1">
    <Artist/>
    <MusicPlayer/>
    </div>
    </div>
  );
};

export default Hero;
