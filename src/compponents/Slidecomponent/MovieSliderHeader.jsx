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

  const [imgUrl, setImgUrl] = useState("");
  const [movieHoverId, setMovieHoverId] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const hoveredMovie = movies?.data?.find((movie) => movie.id === movieHoverId);

  // استفاده از useQuery برای گرفتن تریلر
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
      staleTime: 5000, // جلوگیری از درخواست‌های مکرر در مدت زمان کوتاه
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
    <div
      className="w-full h-[70rem] flex justify-end items-end bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <Swiper
        slidesPerView={6}
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
      >
        {movies?.data?.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <div className="text-center h-full pl-2">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="flex justify-center items-center w-full h-[100%] object-cover rounded-3xl transition-all duration-1000 cursor-pointer"
                  onMouseEnter={() => {
                    setImgUrl(
                      `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    );
                    setMovieHoverId(movie.id);
                  }}
                />
                <h3 className="text-black">{movie.title}</h3>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {hoveredMovie && (
        <div className="absolute inset-0 inline-flex flex-col justify-center pl-10">
          <div className="h-[1rem]">
            <h2 className="text-4xl font-bold mb-4 text-white">
              {hoveredMovie.title}
            </h2>
            <p className="text-lg mb-2 w-[400px] h-[150px] text-white inline-flex">
              {hoveredMovie.overview
                ? truncateText(hoveredMovie.overview, 200)
                : "No description available"}
            </p>
            <div className="ml-12 inline-flex justify-end items-end">
              <button className="text-black bg-yellow-500 px-6 py-3 rounded-3xl mr-4 transition-all duration-300 hover:text-black hover:bg-white">
                <Link to={`/kids/${hoveredMovie.id}`}>Watch Now</Link>
              </button>
              <button className="bg-white bg-opacity-10 backdrop-blur px-6 py-3 rounded-3xl transition-all duration-300 hover:text-black hover:bg-white">
                <Link to={`/kids/${hoveredMovie.id}`}>Details</Link>
              </button>
            </div>
          </div>

          {/* نمایش لودینگ یا تریلر */}
          {isError ? (
            <div className="text-white">Error loading trailer...</div>
          ) : isLoadingTrailer ? (
            <div className="text-white">Loading trailer...</div>
          ) : (
            trailer && (
              <div className="flex justify-center mt-4">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer}`}
                  controls
                  width="80%"
                  onReady={() => setIsPlayerReady(true)}
                />
                {!isPlayerReady && (
                  <div className="text-white">Loading player...</div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
