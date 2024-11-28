import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function AnimePages() {
  
  const [numberPage, setNumberPage] = useState(1);

  const { data: animeP, isLoading, isError, error } = useQuery(
    ["animePage", numberPage],
    async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=d52f00854ed915b688d5abec54bce588&with_genres=16&language=en-US&page=${numberPage}&sort_by=popularity.desc`
      );
      return response.data;
    },
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <div className="text-white text-center">isloading ...</div>;
  }

  if (isError) {
    return <div className="text-white text-center">خطا: {error.message}</div>;
  }

  return (
    <div className="w-full h-[245vh] bg-[#0f0e0e] text-white pt-20 pl-8 pr-8 pb-20">
      <div className="grid grid-cols-5 gap-5">
        {animeP?.results.map((anime) => (
          <Link key={anime.id} to={`/anime/${anime.id}`}>
            <div className="relative h-full flex flex-col items-center bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`}
                alt={anime.title}
                className="w-full rounded-md hover:bg-opacity-50 relative p-4"
              />
              <div className="absolute w-full h-full pl-5 pt-5 bg-black bg-opacity-0 hover:blur-3xl"></div>
            </div>
          </Link>
        ))}

        <div className="text-center w-[1840px] h-full">
          <button
            className="text-white"
            disabled={numberPage === 1 || isLoading}
            onClick={() => setNumberPage((prev) => prev - 1)}
          >
            Back
          </button>
          <span className="pl-5 pr-5">page {numberPage}</span>
          <button
            className="text-white"
            disabled={numberPage === animeP?.total_pages || isLoading}
            onClick={() => setNumberPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
