import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from "js-cookie";
const LoginComp=()=>{
    return(
      <div>
        <Link to="/Login">Login</Link>
      </div>
    )
  }
const Navbar = () => {
   
      const token = Cookies.get('jwtToken');
      const userLogout=()=>{
        Cookies.remove('jwtToken');
        window.location.href='/';
      }
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to="/">
    <a className="btn btn-ghost text-xl ml-2">Musicai</a></Link>
  </div>
  <div className="flex-none gap-2">
    <div className="form-control w-full rounded-full ">
      <input type="text" placeholder="Search" className="input input-bordered w-full mr-40 rounded-full hidden lg:block md:block" />
    </div>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
            
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
      <li>{token ? <button onClick={userLogout}>Logout</button> : <Link to="/Login"><LoginComp/></Link>}</li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar