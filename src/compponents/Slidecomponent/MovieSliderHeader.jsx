import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
export default function MovieSliderHeader({ movies }) {
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      slidesPerGroup={1}
      autoplay={{ delay: 1000, disableOnInteraction: false }}
    >
      {movies?.data?.map((movie) => {
        return (
          <SwiperSlide key={movie.id}>
            <div
              className=" h-screen bg-cover bg-center w-full shadow-inset "
              style={{
                backgroundImage: movie.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                  : `url()`,
              }}
            >
              <div className="relative inset-0 flex flex-col justify-center pl-10 pt-36 w-full ">
                <h2 className="text-4xl font-bold mb-4 text-white">
                  {movie.title}
                </h2>
                <p className="text-lg mb-2 w-[400px] h-[150px] text-white">
                  {truncateText(movie.overview, 200)}
                </p>
              </div>
              <div className="ml-12">
                <button className="text-black bg-yellow-500  px-6 py-3 rounded-3xl mr-4 transition-all duration-300 hover:text-black hover:bg-white">
                  <Link to={`kids/${movie.id}`}> Watch Now </Link>
                </button>
                <button className=" bg-white bg-opacity-10 backdrop-blur z-50 px-6 py-3 rounded-3xl transition-all duration-300 hover:text-black hover:bg-white">
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
