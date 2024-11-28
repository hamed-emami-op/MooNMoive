import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

export default function ContinueWatching() {
  const [allmovie, setAllMovie] = useState("");
  const { data: movies } = useQuery(
    [
      "popular-movies",
    ],
    async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=d52f00854ed915b688d5abec54bce588`
      );
      return res.data.results;
    }
  );

  return (
    <div className="mt-[33rem] bg-[#0f0e0e] w-full h-full">
      <p className="text-white">{allmovie}</p>

      <h2 className="text-white text-3xl pl-10 py-6 ">Continue Watching</h2>
      <div>
        <Swiper slidesPerView={8} autoplay={{ delay: 100 }} loop={true}>
          {movies?.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <div className="w-full p-1 flex justify-center items-end">
                  <p className="absolute pb-2 text-white bottom-0 delay-100">
                    {movie.title}
                  </p>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="text-black text-lg rounded-3xl px-2"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
