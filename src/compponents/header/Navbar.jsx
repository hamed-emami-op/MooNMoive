import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { user, logout } = useContext(UserContext);

  useEffect(() => {
    const navbar = document.getElementById("navbar");

    const handleScroll = () => {
      if (window.scrollY > 10) {
        navbar.classList.add("bg-white/30", "backdrop-blur-3xl");
      } else {
        navbar.classList.remove("bg-white/30", "backdrop-blur-3xl");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [inputShow, setinputShow] = useState(false);
  return (
    <nav
      id="navbar"
      className="fixed flex items-center justify-between w-full z-[1000]"
    >
      <div className="flex items-center">
        <h1 className="text-3xl font-serif text-white px-8 py-2 text-shadow-white text-shadow-blur-5 text-shadow-x-1 text-shadow-y-1 transition-all duration-300 hover:text-shadow-sm ">
          <Link to={"/"}>
            MooN <span className="text-2xl italic">moVIes</span>
          </Link>
        </h1>
        <div>
          <ul className="flex gap-8 ml-5 text-white">
            <li className="group relative">
              <Link className="italic focus:animate-spin" to="/">
                Home
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-500 group-hover:w-full"></span>
            </li>
            <li className="group relative">
              <Link className="italic" to="/anime">
                Anime
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-500 group-hover:w-full"></span>
            </li>
            <li className="group relative">
              <Link className="italic" to="/movie">
                Movie
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-500 group-hover:w-full"></span>
            </li>
            <li className="group relative">
              <Link className="italic" to="/series">
                Series
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-500 group-hover:w-full"></span>
            </li>
            <li className="group relative">
              <Link className="italic" to="/animation">
                Animation
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current transition-all duration-500 group-hover:w-full"></span>
            </li>
          </ul>
        </div>
      </div>

      {/* Search Icon */}
      <div className="flex items-center">
        <div className="flex items-center">
          <SearchBox inputShow={inputShow} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="cursor-pointer mr-10 -ml-7 text-white transition-all duration-300 hover:text-[red] "
            onClick={() => setinputShow(!inputShow)}
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="cursor-pointer mr-5 text-white transition-all duration-300 hover:text-[red]"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
          </svg>
        </div>

        {user ? (
          <div>
            <div className="pr-10"> {user.name}</div>
            <button onClick={logout}>logout</button>
          </div>
        ) : (
          <div className="flex gap-4 px-1 pt-2">
            <Link to="/login">
              {" "}
              <button className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group hover:text-black">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500"></span>
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-300 ease-out bg-white group-hover:h-full"></span>
                <span className="relative">login</span>
              </button>
            </Link>
            <Link to="/sign-up">
              <button className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group hover:text-black">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-500 to-pink-500"></span>
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-300 ease-out bg-white group-hover:h-full"></span>
                <span className="relative">Sign Up</span>
              </button>
            </Link>{" "}
          </div>
        )}
      </div>
    </nav>
  );
}
