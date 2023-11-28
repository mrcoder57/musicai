import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSongId } from "../components/redux/songIdSlice";
import verified from "../assets/verify.svg";
import play from "../assets/play.svg";
import MusicPlayer from "../components/MusicPlayer";
const ArtistPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);
  const getApi = async () => {
    try {
      const response = await axios.get(
        `https://musicaibackend-production.up.railway.app/artist/${id}`
      );
      setData(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      // setLoading(false)
    }
  };

  useEffect(() => {
    getApi();
  }, []);
  const handlePlayClick = (songId) => {
    dispatch(setSongId(songId));
  };
  {
    if (loading) {
      return (
        <div className="flex justify-center items-center mx-8">
          <div className="flex flex-col gap-8 w-full mx-auto">
            <div className="skeleton h-80 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
            <div className="skeleton h-10 w-full"></div>
          </div>
        </div>
      );
    }
  }
  return (
    <div className=" h-full">
      <div className=" h-[50%] bg-slate-400 rounded-xl lg:mx-8 mx-4">
        <div className=" grid lg:grid-cols-3 grid-cols-2 ">
          <img
            src={data.image}
            className=" mx-0 rounded-xl w-42 h-44 lg:mx-12 shadow-md lg:mb-5 lg:mt-28 "
          />

          <div className=" lg:mt-28 lg:ml[-100px] md:ml-[-150px] text-white">
            <p className=" lg:ml-3 text-lg font-semibold">Artist</p>
            <h3 className="mt-4 lg:mt-0 lg:text-8xl text-2xl capitalize font-bold ">
              {data.username}
            </h3>
          </div>
          <img
            src={verified}
            className="h-12 w-12 lg:h-16 lg:w-16 lg:mt-44 lg:ml-[-200px] ml-44 mt-[-80px]"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Genre</th>
              <th>Artist</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.songs.map((song) => (
              <tr>
                <th>
                  <button onClick={() => handlePlayClick(song.id)}>
                    <img src={play} className="h-8 w-8 mt-2" alt="Play" />
                  </button>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://th.bing.com/th/id/R.cde4bf8a3944d1215fd81b4e99d5aec0?rik=%2bcw%2fmixZx8xWUw&riu=http%3a%2f%2ffreevector.co%2fwp-content%2fuploads%2f2013%2f09%2f27050-music-cd-black-circular-shape.png&ehk=xk94%2bm%2fVXDzEUPpvusKJDQmNmFVngsitZ0ghUeOMdYo%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{song.title}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {song.genre}
                  <br />
                </td>
                <td>{data.username}</td>
                <th></th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MusicPlayer />
    </div>
  );
};

export default ArtistPage;
