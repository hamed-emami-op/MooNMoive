import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function Movie({ data }) {
  const fetchMovieDetails = async () => {
    try {
      const responses = await Promise.all(
        data?.map((item) =>
          axios.get(
            `https://api.themoviedb.org/3/movie/${item.id}?api_key=d52f00854ed915b688d5abec54bce588&language=en-US`
          )
        )
      );
      const movieDetails = responses.map((res) => res.data);
      return movieDetails;
    } catch (error) {
      alert("Error fetching details:", error);
      return [];
    }
  };
  const { data: movieDetails } = useQuery(["movieTrailer"], fetchMovieDetails);

  const [selectedGenre, setSelectedGenre] = useState(12);

  const {
    data: genres,
    isLoading,
    error,
  } = useQuery("movieGenres", async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=d52f00854ed915b688d5abec54bce588&language=en-US`
    );
    return response.data.genres;
  });

  const { data: movies } = useQuery(
    ["moviesByGenre", selectedGenre],
    async () => {
      if (!selectedGenre) return [];
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=d52f00854ed915b688d5abec54bce588&with_genres=${selectedGenre}&language=en-US&sort_by=popularity.desc`
      );
      return response.data.results;
    },
    {
      enabled: !!selectedGenre,
    }
  );

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
  const hoveredmovie = data?.find((movie) => movie.id);
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  return (
    <div className="w-full bg-[#0f0e0e] h-[45rem]">
      <div className="flex gap-6 pl-10 py-3">
        <button
          className="text-white bg-[#2f2e2e] transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white focus:bg-white focus:text-black"
          onClick={() => setSelectedGenre(12)}
        >
          Action
        </button>
        <button
          className="text-white bg-[#2f2e2e] transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white"
          onClick={() => setSelectedGenre(28)}
        >
          Adventure
        </button>
        <button
          className="text-white bg-[#2f2e2e] transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white"
          onClick={() => setSelectedGenre(16)}
        >
          Animation
        </button>
        <button
          className="text-white bg-[#2f2e2e] transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white"
          onClick={() => setSelectedGenre(35)}
        >
          Comedy
        </button>
        <button
          className="text-white bg-[#2f2e2e] transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white"
          onClick={() => setSelectedGenre(80)}
        >
          Crime
        </button>
        <button
          className="text-white bg-[#2f2e2e] transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white"
          onClick={() => setSelectedGenre(99)}
        >
          Documentary
        </button>
        <button
          className="text-white bg-[#2f2e2e] transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white"
          onClick={() => setSelectedGenre(18)}
        >
          Drama
        </button>
        <button
          className="text-white bg-[#2f2e2e] transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white"
          onClick={() => setSelectedGenre(10751)}
        >
          Family
        </button>
        <button
          className="text-white bg-[#2f2e2e] transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white"
          onClick={() => setSelectedGenre(14)}
        >
          Fantasy
        </button>
      </div>
      <h3 className="text-white text-4xl pl-20 py-10">Movie List</h3>
      <Swiper
        slidesPerView={6}
        loop={true}
        autoplay={{ delay: 3000 }}
        className="px-10 pb-5"
      >
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="group w-full bg-[#0f0e0e] rounded-3xl p-2 h-[435px]">
              <Link to={`/movie/${movie.id}`}>
                <img
                  className="flex justify-center items-center w-full h-full object-cover rounded-3xl transition-all duration-1000 cursor-pointer hover:bg-opacity-50 hover:bg-black"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div
                  className={` absolute w-full bg-[#0f0e0e] bottom-0 left-0 right-0 rounded-3xl bg-gradient-to-t to-transparent text-center text-white transition-all duration-300 bg-opacity-70 group-hover:opacity-0`}
                >
                  <p className="text-lg font-semibold text-white">
                    {movie.title}
                  </p>
                  <p className="mb-2">
                    <strong>Rating :</strong> 10/{movie.vote_average} |{" "}
                    {movie.vote_count}
                  </p>
                </div>
                <div className="absolute overflow-auto overflow-y-scroll no-scrollbar text-white p-4 bottom-0 mb-2 w-72 h-[420px] rounded-3xl opacity-0 transition-all duration-300 hover:opacity-100 hover:bg-opacity-70 inline-block backdrop-blur-3xl ">
                  <h3 className=" font-semibold ">
                    <strong>Name movie :</strong> {movie.title}
                  </h3>
                  <p>
                    <strong>genres :</strong>{" "}
                    {movie?.genre_ids?.map((id) => (
                      <span key={id}>
                        {genresList.find((genre) => genre.id === id)?.name}{" "}
                      </span>
                    ))}
                  </p>
                  <p className="mt-2 ">
                    <strong>overview : </strong>
                    {hoveredmovie
                      ? truncateText(movie.overview, 50)
                      : "No description available"}
                  </p>
                  {movieDetails?.map((moviese) =>
                    movie.id === moviese.id ? (
                      <div key={moviese.id}>
                        <p className="mt-2">
                          <em>
                            <strong>tagline :</strong> {moviese.tagline}
                          </em>
                        </p>
                        <p className="mt-2">
                          <strong> origin country </strong> :{" "}
                          {moviese.origin_country}
                        </p>
                        <p className="mt-2">
                          <strong>Runtime : </strong> {moviese.runtime} time
                        </p>
                        <p className="mt-2">
                          <strong>Release Date :</strong> {moviese.release_date}
                        </p>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
