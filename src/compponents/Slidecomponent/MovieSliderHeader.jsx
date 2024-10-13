import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

export default function MovieSliderHeader({movies}) {
  if (movies?.isLoading) {
    return <h4 className="text-black">Is Loading...</h4>;
  }
  if (movies?.isError) {
    return (
      <h4 className="text-black">
        error : error-message : {movies?.error.message}
      </h4>
    );
  }
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  function imgColNot() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
      </svg>
    );
  }
  return (
    <Swiper slidesPerView={1} loop={true} autoplay={{ delay: 3000 }}>
      {movies?.data?.map((movie) => {
        return (
          <SwiperSlide key={movie.id}>
            <div
              className=" h-screen bg-cover bg-center w-full shadow-inset "
              style={{
                backgroundImage: movie.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                  : `url(${imgColNot})`,
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
