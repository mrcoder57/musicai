import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import play from '../assets/play.svg';
import pause from '../assets/pause.svg';
import { useSelector, useDispatch } from 'react-redux';
import { selectSongId, setSongId } from './redux/songIdSlice';
import next from "../assets/nextskip.svg"
const MusicPlayer = () => {
  const [song, setSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const selectedSongId = useSelector(selectSongId);
  const dispatch = useDispatch();
  const playerRef = useRef(null);

  const getApi = async () => {
    try {
      const response = await axios.get(`https://musicaibackend-production.up.railway.app/songs/${selectedSongId}`);
      setSong(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const addToQueue = async() => {
    try {
      const songs=await axios.get("https://musicaibackend-production.up.railway.app/songs/")
      setQueue(songs.data)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    addToQueue()
  }, []);


  const playNext = () => {
    const newQueue = [...queue];
    const nextSong = newQueue.shift();
    setQueue(newQueue);
    setSong(nextSong);
   setIsPlaying(true)
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

  return (
    <div className='mt-20 z-50'>
      <div className='fixed bottom-0 z-50 left-0 right-0 bg-gray-900 p-4'>
        <div className='flex items-center space-x-4 z-0'>
          <div className='w-16 h-16 overflow-hidden rounded-md'>
            <img
              src='https://placekitten.com/100/100'
              alt='Album Cover'
              className='w-full h-full object-cover'
            />
          </div>

          <div className='flex-1'>
            <h3 className='text-white font-semibold'>{song.title}</h3>
            {song.artist && song.artist.username ? (
              <p className='text-gray-400'>{song.artist.username}</p>
            ) : (
              <p className='text-gray-400'>Artist Name</p>
            )}
          </div>

          <div className='flex items-center space-x-4'>
            <button className='text-white' onClick={playPauseHandler}>
              {isPlaying ? (
                <img src={pause} className='h-12 w-12' alt='Pause' />
              ) : (
                <img src={play} className='h-10 w-10' alt='Play' />
              )}
            </button>
            <button className='text-white' onClick={playNext} disabled={queue.length === 0}>
            <img src={next} className='h-10 w-10' alt='next' />
            </button>
          </div>
        </div>

        <ReactPlayer
          ref={playerRef}
          url={song.songUrl}
          playing={isPlaying}
          controls={true}
          width='0'
          height='0'
          style={{ display: 'none' }}
          onEnded={handleOnEnded}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
