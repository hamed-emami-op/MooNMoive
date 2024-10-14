import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ContinueWatching() {
  const { data } = useQuery(["api-tmdb-Continue"], async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=d52f00854ed915b688d5abec54bce588"
    );
    return res.data.results;
  });

  return (
    <div className="bg-slate-950 w-full ">
      <div className="flex gap-6 pl-10">
        <button className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl focus:bg-white focus:text-black hover:text-black hover:bg-white">
          <Link> All Popular </Link>
        </button>
        <button className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white">
          Action
        </button>
        <button className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white">
          Animation
        </button>
        <button className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white">
          Adventure
        </button>
        <button className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white">
          Horror
        </button>
        <button className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white">
          Documentary
        </button>
        <button className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white">
          Romance
        </button>
        <button className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white">
          Kids
        </button>
        <button className=" text-white bg-slate-700 transition-all duration-1000 px-2 py-2 rounded-3xl hover:text-black hover:bg-white">
          Comedy
        </button>
      </div>
      <h2 className="text-white text-3xl pl-10 py-6 ">Continue Watching</h2>
      <div>
        <Swiper>
          {data?.map((movie) => {
            <SwiperSlide key={movie.id}>
              <div className="">
                <img
                  src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                  alt={movie.title}
                  className="text-white text-lg "
                />
              </div>
            </SwiperSlide>;
          })}
        </Swiper>
      </div>
    </div>
  );
}
