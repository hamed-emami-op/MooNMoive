import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import axios from "axios";

export default function MovieSliderHeader({ movies }) {
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const [imgUrl, setImgUrl] = useState("/public/moon.png");
  const [movieHoverId, setMovieHoverId] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const hoveredMovie = movies?.data?.find((movie) => movie.id === movieHoverId);

  const fetchTrailer = async (movieId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=d52f00854ed915b688d5abec54bce588`
    );
    return response.data.results;
  };

  const { data: trailerData, isError } = useQuery(
    ["trailer", movieHoverId],
    () => fetchTrailer(movieHoverId),
    {
      enabled: !!movieHoverId,
      staleTime: 5000,
    }
  );

  useEffect(() => {
    if (movieHoverId) {
      setIsLoadingTrailer(true);
    }

    if (trailerData && trailerData.length > 0) {
      const trailerKey = trailerData.find(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" ||
            video.type === "Official Trailer" ||
            video.type === "Featurette")
      )?.key;

      setTrailer(trailerKey || "");
      setIsLoadingTrailer(false);
    } else {
      setTrailer("");
      setIsLoadingTrailer(false);
    }
  }, [trailerData]);
  return (
    <div className=" w-full h-[70rem] transition-all duration-300 bg-[#0f0e0e]">
      <div
        className=" w-full h-[67rem] inline-flex justify-end items-end bg-cover bg-center  transition-all duration-500 bg-[#0f0e0e]"
        style={{
          boxShadow: "inset 25em -23.5em 300px  rgb(15, 14, 14)",
          backgroundImage: `url(${imgUrl})`
        }}
      >
        {hoveredMovie && (
          <div className="absolute inset-0 inline-flex flex-col justify-center pl-10">
            <div className="h-[1rem] ">
              <h2 className="text-4xl font-bold mb-4 text-white">
                {hoveredMovie.title}
              </h2>
              <p className="text-lg mb-2 w-[400px] h-[150px] text-white inline-flex">
                {hoveredMovie.overview
                  ? truncateText(hoveredMovie.overview, 200)
                  : "No description available"}
              </p>
              <div className="ml-12 inline-flex justify-end items-end">
                <Link to={`/kids/${hoveredMovie.id}`}>
                  <button className="text-black bg-yellow-500 px-6 py-3 rounded-3xl mr-4 transition-all duration-300 hover:text-black hover:bg-white">
                    Watch Now
                  </button>
                </Link>
                <Link to={`/kids/${hoveredMovie.id}`}>
                  <button className="bg-white bg-opacity-10 backdrop-blur px-6 py-3 rounded-3xl transition-all duration-300 hover:text-black hover:bg-white">
                    Details
                  </button>
                </Link>
              </div>
            </div>

            {isError ? (
              <div className="text-white">Error loading trailer...</div>
            ) : isLoadingTrailer ? (
              <div className="text-white">Loading trailer...</div>
            ) : (
              trailer && (
                <div className="flex justify-center mt-4 ml-[46rem]">

                  {!isPlayerReady && (
                    <div className="text-white">Loading player...</div>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
      <h2 className="text-3xl px-5 py-3 pb-6 bg-[#0f0e0e] text-white">
        Trending Movies
      </h2>
      <Swiper
        slidesPerView={6}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
      >
        {movies?.data?.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <div className="h-[500px] flex justify-center items-end px-2 bg-[#0f0e0e] pb-16">
                <h3 className="absolute text-center text-white p-2">
                  {movie.title}
                </h3>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="flex justify-center items-center w-full h-[100%] object-cover rounded-3xl transition-all duration-1000 cursor-pointer hover:shadow-lg"
                  onMouseEnter={() => {
                    setImgUrl(
                      `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    );
                    setMovieHoverId(movie.id);
                  }}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
