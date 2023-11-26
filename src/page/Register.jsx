import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imagePublicId, setImagePublicId] = useState(null);
  const [loading , setLoading]=useState(true)
  const handleImageUpload = async (event) => {
    const files = event.target.files;
  
    if (files && files.length > 0) {
      const file = files[0];
      const preset = "ka34otny"; 
  
     
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);
  
      try {
     
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/duf2bmboc/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
  
        if (response.ok) {
          setLoading(false)
          const result = await response.json();
  
          if (result.public_id) {
            
            setImagePublicId(result.public_id);
          }
        } else {
       
          console.error("Image upload failed:", response.statusText);
        }
      } catch (error) {
       
        console.error("Error during image upload:", error);
      }
    }
  };
  
  const generateImageUrl = () => {
    if (imagePublicId) {
      
      const cld = new Cloudinary({
        cloud: {
          cloudName: "duf2bmboc",
        },
      });
  
      const img = cld.image(imagePublicId);
      return img.toURL();
    }
  
    return "";
  };
  

  const handleRegister = async () => {
    const imageUrl = generateImageUrl();
    if (!email || !password || !confirmPassword || !username || !imageUrl ) {
      console.log("please fill complete information");
    }

    if (password !== confirmPassword) {
      console.log("passwords doesnot match");
    }
    try {
      const response = await axios.post(
        "https://musicaibackend-production.up.railway.app/users/register",
        {
          email: email,
          username: username,
          password: password,
          image:imageUrl
        }
      );
      console.log("registeration successful", response.data);
      setTimeout(() => {
        
        window.location.href = "/Login";
      }, 3000); 
      
     
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
      
        console.error("user creation failed", error.response.data);
      } else {
    
        console.error("user creation failed with unknown error", error);
      }
    }
  };

  return (
    <div className="hero min-h-screen h-[790px] bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 md:scale-125 md:mr-[60px] md:mb-[50px] transition ease-in-out">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered"
                required
              />
            </div> <div className="form-control ">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                name="image"
                className="input input-bordered flex justify-evenly h-[200px] w-full"
                required
              />
              {imagePublicId && (
                <div className="mt-4">
                  <p>Generated Image URL:</p>
                  <code className=" w-full ">{generateImageUrl().slice(0,10)}</code>
                </div>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered"
                required
              />
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover"></a>
              </label>
            </div>
            <Link to="/Login">
              <p>
                ?already have an account <br />
                <span>Login</span>
              </p>
            </Link>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary transition ease-in-out duration-300 hover:scale-105"
                type="button"
                onClick={handleRegister}
                disabled={loading}
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="text-center lg:text-left">
        </div>
      </div>
    </div>
  );
};

export default Register;