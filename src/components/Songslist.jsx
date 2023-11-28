import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import play from "../assets/play.svg";
import { useDispatch } from 'react-redux';
import { setSongId } from "./redux/songIdSlice";

const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();

  const getApi = async () => {
    try {
      const response = await axios.get(
        "https://musicaibackend-production.up.railway.app/songs"
      );
      setSongs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const handlePlayClick = (songId) => {
    // Dispatch the setSongId action with the clicked songId
    dispatch(setSongId(songId));
  };

  return (
      <div className="overflow-x-auto card shadow-lg h-64">
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
               <button onClick={() => handlePlayClick(song.id)}>
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
