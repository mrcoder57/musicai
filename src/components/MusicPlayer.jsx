import React from 'react';
import ReactPlayer from 'react-player';
import play from "../assets/play.svg";
import pause from "../assets/pause.svg";
const MusicPlayer = () => {
  const songs = [
    {
      title: 'Song 1',
      source: 'https://example.com/song1.mp3',
    },
    {
      title: 'Song 2',
      source: 'https://example.com/song2.mp3',
    },
  
  ];

  const currentSongIndex = 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 overflow-hidden rounded-md">
          <img
            src="https://placekitten.com/100/100" 
            alt="Album Cover"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-white font-semibold">{songs[currentSongIndex].title}</h3>
          <p className="text-gray-400">Artist Name</p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-white">
           <img src={pause} className=' h-12 w-12'/>
          </button>
          <button className="text-white">
          <img src={play} className=' h-10 w-10'/>
          </button>
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {/* Your next icon */}
            </svg>
          </button>
        </div>
      </div>

      <ReactPlayer
        url={songs[currentSongIndex].source}
        playing={true}
        controls={false}
        width="0"
        height="0"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default MusicPlayer;
