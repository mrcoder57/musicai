import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useState } from "react";

import avatar from "../assets/cactus.svg"
const LoginComp = () => {
  return (
    <div>
      <Link to="/Login">Login</Link>
    </div>
  );
};
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");
  const userLogout = () => {
    Cookies.remove("jwtToken");
    window.location.href = "/";
  };
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/">
          <a className="btn btn-ghost text-xl ml-2">Musicai</a>
        </Link>
      </div>
      <div className="flex-none gap-2">
      <form onSubmit={handleSearchSubmit}>
        <div className="form-control w-full rounded-full ">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
              onChange={handleSearchInputChange}
            className="input input-bordered w-full lg:mr-40 mr-[-70px] rounded-full lg:block md:block"
          />
        </div>
        </form>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={avatar}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              {token ? (
                <button onClick={userLogout}>Logout</button>
              ) : (
                <Link to="/Login">
                  <LoginComp />
                </Link>
              )}
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
