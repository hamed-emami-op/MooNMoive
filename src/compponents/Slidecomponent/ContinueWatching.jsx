import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

export default function ContinueWatching() {
  const [allmovie, setAllMovie] = useState("");
  const { data: movies } = useQuery(["api-tmdbn ]\
    "], async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=d52f00854ed915b688d5abec54bce588`
    );
    return res.data.results;
  });

  return (
    <div className="bg-slate-950 w-full">
      <p className="text-white">{allmovie}</p>
      <div className="flex gap-6 pl-10">
        <button
          className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white focus:bg-white focus:text-black"
          onClick={() => setAllMovie("popular")}
        >
          All Popular
        </button>
        <button
          className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white focus:bg-white focus:text-black"
          onClick={() => setAllMovie("ac")}
        >
          Action
        </button>
        <button
          className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white focus:bg-white focus:text-black"
          onClick={() => {}}
        >
          Animation
        </button>
        <button
          className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white focus:bg-white focus:text-black"
          onClick={() => {}}
        >
          Adventure
        </button>
        <button
          className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white focus:bg-white focus:text-black"
          onClick={() => {}}
        >
          Horror
        </button>
        <button
          className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white focus:bg-white focus:text-black"
          onClick={() => {}}
        >
          Documentary
        </button>
        <button
          className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white focus:bg-white focus:text-black"
          onClick={() => {}}
        >
          Romance
        </button>
        <button
          className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white focus:bg-white focus:text-black"
          onClick={() => {}}
        >
          Kids
        </button>
        <button
          className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white focus:bg-white focus:text-black"
          onClick={() => {}}
        >
          Comedy
        </button>
      </div>
      <h2 className="text-white text-3xl pl-10 py-6 ">Continue Watching</h2>
      <div>
        <Swiper slidesPerView={6} loop={true} autoplay={{ delay: 3000 }}>
          {movies?.map((movie) => {
            <SwiperSlide key={movie.id}>
              <div className="w-full">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="text-white text-lg"
                />
              </div>
            </SwiperSlide>;
          })}
        </Swiper>
      </div>
    </div>
  );
}
