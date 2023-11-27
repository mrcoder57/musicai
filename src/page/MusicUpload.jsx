import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const MusicUpload = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [musicFile, setMusicFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get("jwtToken");

  if (!token) {
    console.log("No token");
  }
  const config = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const handleMusicUpload = async (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const preset = "ka34otny";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/duf2bmboc/raw/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          setLoading(false);
          const result = await response.json();
          console.log("uploaded successfully");

          if (result.public_id) {
            setMusicFile(result.public_id);
          }
        } else {
          console.error("Music upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during Music upload:", error);
      }
    }
  };

  const generateMusicUrl = () => {
    if (musicFile) {
      return `https://res.cloudinary.com/duf2bmboc/raw/upload/${musicFile}`;
    }

    return "";
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const musicUrl = generateMusicUrl();
    console.log(musicUrl)
    if (!title || !genre || !musicUrl) {
      console.log("please fill complete information");
    }

    try {
      const response = await axios.post(
        "https://musicaibackend-production.up.railway.app/songs",
        {
          title: title,
          songUrl: musicUrl,
          genre: genre,
        },
        config
      );
      console.log("upload successful", response.data);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("upload creation failed", error.response.data);
      } else {
        console.error("song creation failed with unknown error", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto card shadow-lg p-8 rounded">
      <h2 className="text-2xl font-bold mb-6">Upload Music</h2>

      <form onSubmit={handleFormSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        {/* Genre Input */}
        <div className="mb-4">
          <label htmlFor="genre" className="block text-sm font-medium">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
          />
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="music" className="block text-sm font-medium">
            Upload Music
          </label>
          <input
            type="file"
            id="music"
            name="music"
            className="ml-2"
            onChange={handleMusicUpload}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
         {loading ? "uploading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MusicUpload;
