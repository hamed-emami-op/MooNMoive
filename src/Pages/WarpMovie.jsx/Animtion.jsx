import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function Animation({ data }) {
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
  ];
  const hoveredanimation = data?.find((anime) => anime.id);
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  return (
    <div className="w-full bg-[#0f0e0e] h-[45rem]">
      <h3 className="text-white text-4xl pl-20 py-10">Animation List</h3>
      <Swiper
        slidesPerView={6}
        loop={true}
        autoplay={{ delay: 3000 }}
        className="px-10 pb-5"
      >
        {data?.map((anime) => (
          <SwiperSlide key={anime.id}>
            <div className="group p-2 w-full bg-[#0f0e0e] rounded-3xl h-[435px] ">
              <Link to={`/animation/details/movie/${anime.id}`}>
                <img
                  className="relative flex justify-center items-center w-full h-[100%] object-cover rounded-3xl transition-all duration-1000 cursor-pointer hover:bg-opacity-50 hover:bg-black"
                  src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`}
                  alt={anime.title}
                />
                <div
                  className={` absolute w-full bg-[#0f0e0e] bottom-0 left-0 right-0 rounded-3xl bg-gradient-to-t to-transparent text-center text-white transition-all duration-300 bg-opacity-70 group-hover:opacity-0`}
                >
                  <p className="text-lg font-semibold text-white">
                    {anime.title}
                  </p>
                  <p className="mb-2">
                    <strong>Rating :</strong> 10/{anime.vote_average} |{" "}
                    {anime.vote_count}
                  </p>
                </div>
                <div className="absolute overflow-auto overflow-y-scroll no-scrollbar text-white p-4 bottom-0 mb-2 w-72 h-[420px] rounded-3xl opacity-0 transition-all duration-300 hover:opacity-100 hover:bg-opacity-70 inline-block backdrop-blur-3xl ">
                  <h3 className=" font-semibold ">
                    <strong>Name anime :</strong> {anime.title}
                  </h3>
                  <p>
                    <strong>genres :</strong>{" "}
                    {anime?.genre_ids?.map((id) => (
                      <span key={id}>
                        {genresList.find((genre) => genre.id === id)?.name}{" "}
                      </span>
                    ))}
                  </p>
                  <p className="mt-2 ">
                    <strong>overview : </strong>
                    {hoveredanimation
                      ? truncateText(anime.overview, 50)
                      : "No description available"}
                  </p>
                  <div key={anime.id}>
                    <p className="mt-2">
                      <em>
                        <strong>tagline :</strong> {anime.tagline}
                      </em>
                    </p>
                    <p className="mt-2">
                      <strong> origin country </strong> : {anime.origin_country}
                    </p>
                    <p className="mt-2">
                      <strong>Runtime : </strong> {anime.runtime} time
                    </p>
                    <p className="mt-2">
                      <strong>Release Date :</strong> {anime.release_date}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
