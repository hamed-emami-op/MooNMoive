import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

export default function MovieSlider() {
  const [movies, setMovies] = useState([]);
  const { data, isLoading, isError, error } = useQuery(["api-tmdb"], () => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=d52f00854ed915b688d5abec54bce588&with_genres=16&sort_by=popularity.desc"
      )
      .then((res) => setMovies(res.data.results));
  });
  if (isLoading) {
    return <h4 className="text-black">Is Loading...</h4>;
  }
  if (isError) {
    return (
      <h4 className="text-black">error : error-message : {error.message}</h4>
    );
  }
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <Swiper slidesPerView={1} loop={true} autoplay={{ delay: 3000 }}>
      {movies?.map((movie) => {
        return (
          <SwiperSlide key={movie.id}>
            <div
              className=" h-screen bg-cover bg-center w-full shadow-inset "
              style={{
                backgroundImage: movie.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                  : `url('/moon.png')`,
                borderRadius: `50px`
              }}
            >
              <div className="relative inset-0 flex flex-col justify-center p-8 pt-36 w-full ">
                <h2 className="text-4xl font-bold mb-4 text-white">
                  {movie.title}
                </h2>
                <p className="text-lg mb-2 w-[400px] h-[150px] text-white">
                  {truncateText(movie.overview, 200)}
                </p>
              </div>
              <div className="ml-12">
                <button className="text-black bg-yellow-500  px-6 py-3 rounded-3xl mr-4">
                  <Link to={`kids/${movie.id}`}> Watch Now </Link>
                </button>
                <button className=" bg-white bg-opacity-10 backdrop-blur z-50 px-6 py-3 rounded-3xl">
                  <Link to={`kids/${movie.id}`}>Details</Link>
                </button>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
