import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBox(props) {
  const [query, setquery] = useState("");
  const [searchResult, setSearchResult] = useState();
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (query) {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=d52f00854ed915b688d5abec54bce588&query=${query}`
        );

        console.log(data);
        setSearchResult(data);
      } else {
        setSearchResult([]);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [query]);
  const genresList = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
    { id: 10759, name: "Action & Adventure" },
    { id: 10762, name: "Kids" },
    { id: 10763, name: "News" },
    { id: 10764, name: "Reality" },
    { id: 10765, name: "Sci-Fi & Fantasy" },
    { id: 10766, name: "Soap" },
    { id: 10767, name: "Talk" },
    { id: 10768, name: "War & Politics" },
    { id: 37, name: "Western" },
  ];
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          className={`bg-gray-500 outline-none rounded-3xl p-1 px-3 text-yellow-50 transition-all duration-300 ease-in-out  ${props.inputShow ? " w-64 opacity-100 pr-[1.8rem] " : "mr-12 w-0 opacity-0"}`}
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <div
          className={`absolute w-[29em] bg-white rounded-md mt-1 -ml-28  overflow-auto transition-all duration-500 ${query && props.inputShow ? "h-[25em]" : "h-0"}`}
        >
          <div>
            {searchResult?.results?.map((item) => (
              <Link
                key={item.id}
                to={`/${item.media_type}/${item.media_type === "person" ? "person" : "details"}/${item.media_type}/${item.id}`}
              >
                <div className="text-black px-2 flex">
                  <img
                    className="shadow-2xl w-[131.5px] h-[197px] m-0.5 rounded-xl flex"
                    src={`${
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "/public/film.svg"
                    }`}
                    alt={item.title}
                  />
                  <div className="pl-2">
                    <p className="text-2xl mb-2 text-slate-800">
                      {item.name || item.title}
                    </p>
                    <span className="block">
                      {item.genre_ids?.map((gener) => (
                        <span key={gener}>
                          {
                            genresList.find((genret) => genret.id === gener)
                              ?.name
                          }{" "}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
