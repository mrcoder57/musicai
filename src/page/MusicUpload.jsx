import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const MusicUpload = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [musicFile, setMusicFile] = useState(null);

  const token = Cookies.get("jwtToken");

  const handleFileChange = (event) => {
    setMusicFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', musicFile);
    formData.append('upload_preset', 'ka34otny');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/duf2bmboc/image/upload', formData);
      const musicFileUrl = response.data.secure_url;

      await saveMusicDataToApi({
        title,
        artist,
        genre,
        songUrl: musicFileUrl,
      });

      setTitle('');
      setArtist('');
      setGenre('');
      setMusicFile(null);

      console.log('Music file uploaded successfully:', musicFileUrl);
    } catch (error) {
      console.error('Error uploading music file:', error);
    }
  };

  const config = {
    headers: {
      Authorization: `${token}`
    }
  };

  const saveMusicDataToApi = async (musicData) => {
    try {
      await axios.post('https://musicaibackend-production.up.railway.app/songs/', musicData, config);
    } catch (error) {
      console.error('Error saving music data to API:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto card shadow-lg p-8 rounded">
      <h2 className="text-2xl font-bold mb-6">Upload Music</h2>

      <form onSubmit={handleFormSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input type="text" id="title" name="title" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>

        {/* Genre Input */}
        <div className="mb-4">
          <label htmlFor="genre" className="block text-sm font-medium">Genre</label>
          <input type="text" id="genre" name="genre" className="mt-1 p-2 w-full border rounded-md" onChange={(e) => setGenre(e.target.value)} value={genre} />
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="music" className="block text-sm font-medium">Upload Music</label>
          <input type="file" id="music" name="music" className="ml-2" onChange={handleFileChange} />
        </div>

        <div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default MusicUpload;
