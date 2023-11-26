import React from "react";
import Songscards from "../components/Songscards";
import Songslist from "../components/Songslist";
import Artist from "../components/Artist";
import MusicPlayer from "../components/MusicPlayer";
const Hero = () => {
  return (
    <div className="h-full">
     
      <div className="mt-16 lg:mx-16 md:mx-5 mx-10 grid gap-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-1">
        <Songscards />
        <Songslist />
      </div>
      <div className="lg:mx-20 mx-10 lg:gap-5 grid grid-cols-1">
        <div className="mb-5">
          {" "}
          
          <Artist />
        </div>
        <div className="w-full">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default Hero;
