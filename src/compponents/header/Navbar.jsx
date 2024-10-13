import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useQuery } from "react-query";
import axios from "axios";

export default function Navbar() {
  const [inputShow, setinputShow] = useState(false);
  const {data} = useQuery(["api_key_navbar"] , () => {
    axios.get("").then((res) => res.data)
  })
  return (
    <nav className="fixed flex items-center justify-between w-full h-11 z-[1000] bg-white bg-opacity-20  backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center pl-3">
        <h1 className="text-yellow-500 text-2xl font-serif">
          <Link to={"/"}>
            MooN <span className="text-white text-2xl italic">moVies</span>
          </Link>
        </h1>

        {/* Navigation Links */}
        <ul className="flex gap-10 ml-6 text-white">
          <li>
            <Link className="italic" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="italic" to="/movies">
              Movies
            </Link>
          </li>
          <li>
            <Link className="italic" to="/series">
              Series
            </Link>
          </li>
          <li>
            <Link className="italic" to="/kids">
              Kids
            </Link>
          </li>
        </ul>
      </div>

      {/* Search Icon */}
      <div className="flex items-center ">
        <div className=" flex items-center">
          <SearchBox inputShow={inputShow} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="cursor-pointer mr-10 -ml-7 text-yellow-400"
            onClick={() => setinputShow(!inputShow)}
          >
            <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018" />
            <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11" />
          </svg>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="cursor-pointer mr-5 text-yellow-400 "
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
          </svg>
        </div>

        {/* Login/Signup Buttons */}
        <div className="flex gap-4 px-1 py-1">
          <Link
            to="/login"
            className="bg-yellow-500 text-black rounded-3xl py-2 text-center w-16"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-yellow-500 text-black rounded-3xl px-2 py-2 text-center w-20"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
