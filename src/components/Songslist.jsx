import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import play from "../assets/play.svg";
import { useDispatch } from 'react-redux';
import { setSongId } from "./redux/songIdSlice";

const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();
const [loading,setLoading]=useState(true)
  const getApi = async () => {
    try {
      const response = await axios.get(
        "https://musicaibackend-production.up.railway.app/songs"
      );
      setSongs(response.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const handlePlayClick = (songId) => {
    dispatch(setSongId(songId));
  };

  {if(loading){
    return(
      <div className="flex flex-col w-[80%] mt-8 lg:mt-0 gap-6">
  <div className="skeleton h-6 w-full"></div>
  <div className="skeleton h-6 w-full"></div>
  <div className="skeleton h-6 w-full"></div>
  <div className="skeleton h-6 w-full"></div>
  <div className="skeleton h-6 w-full"></div>
</div>
    )
  }}
  return (
      <div className="overflow-x-hidden ml-2 card shadow-lg h-64">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <td>Title</td>
              <td>Genre</td>
              <td>Artist</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr className=" h-10 font-semibold text-xl" key={song.id}>
               <button className=" h-10 w-10" onClick={() => handlePlayClick(song.id)}>
                    <img src={play} className="h-8 w-8 mt-2" alt="Play" />
                  </button>
                <td className=" text-lg capitalize">{song.title}</td>
                <td className=" text-lg capitalize">{song.genre}</td>
                <td className=" text-lg capitalize">{song.artist.username}</td>
                <td className=" text-lg capitalize">
               
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default SongsList;
