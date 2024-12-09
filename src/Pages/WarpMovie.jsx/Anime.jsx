import { useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import axios from "axios";
import { useQuery } from "react-query";

export default function Anime({ data, animeLoading }) {
  const fetchAnimeDetails = async () => {
    try {
      const responses = await Promise.all(
        data?.map((item) =>
          axios.get(
            `https://api.themoviedb.org/3/tv/${item.id}?api_key=d52f00854ed915b688d5abec54bce588&language=en-US`
          )
        )
      );

      const animeDetails = responses.map((res) => res.data);
      return animeDetails;
    } catch (error) {
      alert("Error fetching details:", error);
      return [];
    }
  };

  const { data: animeDetails } = useQuery(["animeTrailer"], fetchAnimeDetails);

  const fetchAnimeTrailer = async () => {
    try {
      const responses = await Promise.all(
        animeDetails?.map((item) =>
          axios.get(
            `https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=d52f00854ed915b688d5abec54bce588`
          )
        )
      );

      const trailers = responses.map((res) => {
        const trailer = res.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        return {
          animeId: res.config.url.match(/tv\/(\d+)\//)[1],
          trailerKey: trailer?.key || null,
        };
      });

      return trailers;
    } catch (error) {
      alert("Error fetching trailers:", error);
      return [];
    }
  };
  const { data: trailers } = useQuery(
    ["animeTrailers", animeDetails],
    fetchAnimeTrailer,
    {
      enabled: !!animeDetails,
    }
  );

  const getTrailerForHoveredAnime = (hoverId) => {
    return (
      trailers?.find((trailer) => trailer.animeId === String(hoverId))
        ?.trailerKey || null
    );
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
  const [watchTriler, setWatchTriler] = useState(false);
  const [imgUrl, setImgUrl] = useState("/moon.png");
  const [hoverId, setHoverId] = useState(null);
  const hoveredAnime = animeDetails?.find((anime) => anime.id === hoverId);
  return (
    <div className="w-full mb-6 bg-[#0f0e0e]">
      <div
        className="w-full h-[67rem] bg-[#0f0e0e] bg-cover bg-center  inline-flex justify-end items-end transition-all duration-500"
        style={{
          boxShadow: "inset 25em -23.5em 300px rgb(15, 14, 14)",
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        {hoveredAnime && (
          <div
            className={`absolute w-full h-[67rem] flex flex-col justify-center inset-0 pl-10`}
            key={hoveredAnime.id}
          >
            <div className="h-[1rem]">
              <h2 className="text-5xl mb-4 font-bold text-white">
                {hoveredAnime.name}
              </h2>
              <div className="flex mb-4">
                <p className="flex items-center gap-1 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-play-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
                  </svg>
                  <span>Tv</span>
                </p>
                {hoveredAnime.last_episode_to_air.runtime && (
                  <p className="text-white pl-5 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-clock-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    </svg>
                    {hoveredAnime.last_episode_to_air.runtime}m
                  </p>
                )}
                <span className="flex text-white items-center pl-5 gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-calendar-event-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5" />
                  </svg>
                  {hoveredAnime.first_air_date}
                </span>
                <span className="flex text-white items-center pl-5 gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-calendar-event"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                  </svg>
                  {hoveredAnime.first_air_date}
                </span>
              </div>
              <p className="text-lg mb-2 w-[400px] h-[150px] text-white inline-flex">
                {hoveredAnime.overview
                  ? truncateText(hoveredAnime.overview, 200, "...")
                  : "No description available"}
              </p>
              <div className=" mt-4 flex items-end">
                <button
                  className="flex text-black bg-yellow-500 px-6 py-3 rounded-3xl mr-4 transition-all duration-300 hover:text-black hover:bg-white"
                  onClick={() => setWatchTriler(!watchTriler)}
                >
                  Watch Triler
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="ml-1.5 mt-0.5"
                    viewBox="0 0 16 16"
                  >
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                  </svg>
                </button>
                <Link to={`/anime/details/tv/${hoveredAnime.id}`}>
                  <button className="flex bg-white bg-opacity-10 backdrop-blur px-6 py-3 rounded-3xl transition-all duration-300 hover:text-black hover:bg-white">
                    Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="ml-2 mt-0.5"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
            <div
              className={`transition-all duration-300 ml-[50%] text-center`}
              style={{ minHeight: "370px", marginLeft: "1000px" }}
            >
              {watchTriler && hoverId && getTrailerForHoveredAnime(hoverId) ? (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${getTrailerForHoveredAnime(hoverId)}`}
                  controls
                  width="90%"
                  height="360px"
                />
              ) : (
                <span className="text-white bg-black">FUCK OFF</span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="-mt-64 px-10 w-full h-[600px]">
        <h2 className="text-white text-4xl pl-10 py-10">Anime List</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={6}
          autoplay={{
            delay: 3000,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          loop
        >
          {animeDetails?.map((anime) => {
            return (
              <SwiperSlide key={anime.id}>
                <Link to={anime.id}>
                  <div className="group w-full bg-[#0f0e0e] rounded-3xl h-[435px] ">
                    <img
                      className={`relative flex justify-center items-center w-full h-[100%] object-cover rounded-3xl transition-all duration-1000 cursor-pointer hover:bg-opacity-50 hover:bg-black`}
                      src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`}
                      alt={anime.name}
                    />
                    <div className=" absolute w-full bg-[#0f0e0e] bottom-0 left-0 right-0 rounded-3xl bg-gradient-to-t to-transparent text-center text-white transition-all duration-300 bg-opacity-70 group-hover:opacity-0">
                      <p className="text-lg font-semibold text-white">
                        {anime.name}
                      </p>
                      <p className="mb-2">
                        <strong>Rating :</strong> 10/{anime.vote_average} |{" "}
                        {anime.vote_count}
                      </p>
                    </div>
                    <div
                      className="absolute overflow-auto overflow-y-scroll no-scrollbar text-white p-4 h-full bottom-0 w-full rounded-3xl opacity-0 transition-all duration-300 hover:opacity-100 hover:bg-opacity-70 inline-block backdrop-blur-xl "
                      onClick={() => {
                        setImgUrl(
                          `https://image.tmdb.org/t/p/original${anime.backdrop_path}`
                        );

                        setHoverId(anime.id);
                      }}
                    >
                      <h3 className="pb-2 font-semibold ">
                        Name Anime : {anime.name}
                      </h3>
                      <p>
                        <strong> genres : </strong>
                        {anime.genres?.map((genre) => (
                          <span key={genre.id}> {genre.name}</span>
                        ))}{" "}
                      </p>
                      <p className="mt-2 ">
                        <strong> overview : </strong>
                        {anime
                          ? truncateText(anime.overview, 50)
                          : "No description available"}
                      </p>
                      <p className="mt-2">
                        <strong> number of episodes </strong> :{" "}
                        {anime.number_of_episodes}
                      </p>
                      <p className="mt-2">
                        <strong> number of seasons </strong> :{" "}
                        {anime.number_of_seasons}
                      </p>
                      <p className="mt-2">
                        <strong> Release Date </strong> : {anime.first_air_date}
                      </p>
                      <p className="mt-2">
                        <strong> origin country </strong> :{" "}
                        {anime.origin_country}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
