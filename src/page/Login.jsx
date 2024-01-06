import React, { useState } from "react";
import axios from "axios";  // Import Axios
import Cookies from "js-cookie";
import { Link } from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.post(
        "https://musicailbackend.onrender.com/users/login",
        {
          email: email,
          password: password,
        }
      );
      const token = response.data.token;

      Cookies.set("jwtToken", token);
    
      console.log("Login successful", response.data);
    
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed", error.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <Link to='/register' className="label-text-alt link link-hover">
                  Register
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
