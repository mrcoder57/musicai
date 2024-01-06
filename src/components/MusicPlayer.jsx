import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
import { useSelector, useDispatch } from "react-redux";
import { selectSongId, setSongId } from "./redux/songIdSlice";
import next from "../assets/nextskip.svg";
const MusicPlayer = () => {
  const [song, setSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const selectedSongId = useSelector(selectSongId);
  const [played, setPlayed] = useState(0);
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const [seeking, setSeeking] = useState(false);

  const getApi = async () => {
    try {
      const response = await axios.get(
        `https://musicailbackend.onrender.com/songs/${selectedSongId}`
      );
      setSong(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToQueue = async () => {
    try {
      const songs = await axios.get(
        "https://musicailbackend.onrender.com/songs/"
      );
      setQueue(songs.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    addToQueue();
  }, []);

  const playNext = () => {
    const newQueue = [...queue];
    const nextSong = newQueue.shift();
    setQueue(newQueue);
    setSong(nextSong);
    setIsPlaying(true);
  };

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    getApi();
  }, [selectedSongId]);

  
  const handleOnEnded = () => {
    playNext();
  };

  const handleProgress = (progress) => {
    if (!seeking) {
      setPlayed(progress.played);
    }
  };
  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    const value = parseFloat(e.target.value);
    
    setPlayed(value);
    console.log(value)
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
    playerRef.current.seekTo(played+25);
  };
  return (
    <div className="mt-20 z-50">
      <div className="fixed bottom-0 z-50 left-0 right-0 bg-gray-900 p-4">
        <div className="flex items-center space-x-4 z-0">
          <div className="w-16 h-16 overflow-hidden rounded-md">
            <img
              src="https://placekitten.com/100/100"
              alt="Album Cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
          {song && song.title ? (
             <h3 className="text-white font-semibold">{song.title.slice(0,12)}</h3>
            ) : (
              <h3 className="text-white font-semibold">title</h3>
            )}
            
            {song.artist && song.artist.username ? (
              <p className="text-gray-400">{song.artist.username}</p>
            ) : (
              <p className="text-gray-400">Artist Name</p>
            )}
          </div>

          <div className="flex lg:flex-row flex-col items-center space-x-4">
            <div className="lg:w-44 w-28">
              <progress
              value={played * 100}
              max={100}
              className='w-full h-2  btn-primary rounded-full bg-zinc-300'
              onMouseDown={handleSeekMouseDown}
              onInput={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
              />
            </div>
            <div className=" ">
            <button className="text-white mr-2" onClick={playPauseHandler}>
              {isPlaying ? (
                <img src={pause} className="h-12 w-12" alt="Pause" />
              ) : (
                <img src={play} className="h-10 w-10" alt="Play" />
              )}
            </button>
            <button
              className="text-white"
              onClick={playNext}
              disabled={queue.length === 0}
            >
              <img src={next} className="h-10 w-10" alt="next" />
            </button>
            </div>
          </div>
        </div>

        <ReactPlayer
          ref={playerRef}
          url={song.songUrl}
          playing={isPlaying}
          controls={true}
          width="0"
          height="0"
          style={{ display: "none" }}
          onEnded={handleOnEnded}
          onProgress={handleProgress}
          progressInterval={1000}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
