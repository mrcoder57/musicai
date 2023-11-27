import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import play from '../assets/play.svg';
import pause from '../assets/pause.svg';
import { useSelector } from 'react-redux';
import { selectSongId } from './redux/songIdSlice';

const MusicPlayer = () => {
  const [song, setSong] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const selectedSongId = useSelector(selectSongId);
  console.log(selectedSongId)

  const getApi = async () => {
    try {
      const response = await axios.get(`https://musicaibackend-production.up.railway.app/songs/${selectedSongId}`);
      setSong(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, [selectedSongId]);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className='mt-20'>
      <div className='fixed bottom-0 left-0 right-0 bg-gray-900 p-4'>
        <div className='flex items-center space-x-4'>
          <div className='w-16 h-16 overflow-hidden rounded-md'>
            <img
              src='https://placekitten.com/100/100'
              alt='Album Cover'
              className='w-full h-full object-cover'
            />
          </div>

          <div className='flex-1'>
            <h3 className='text-white font-semibold'>{song.title}</h3>
            <p className='text-gray-400'>Artist Name</p>
          </div>

          <div className='flex items-center space-x-4'>
            <button className='text-white' onClick={playPauseHandler}>
              {isPlaying ? (
                <img src={pause} className='h-12 w-12' alt='Pause' />
              ) : (
                <img src={play} className='h-10 w-10' alt='Play' />
              )}
            </button>
          </div>
        </div>

        <ReactPlayer
          url={song.songUrl}
          playing={isPlaying}
          controls={false}
          width='0'
          height='0'
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
