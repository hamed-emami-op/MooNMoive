import axios from "axios";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

export default function TrendingMoviesSlider() {
  const [movies , setMovies] = useState([]) 
    const { data } = useQuery(["api-kids"], () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=d52f00854ed915b688d5abec54bce588&with_genres=16&sort_by=popularity.desc`
      )
      .then((res) => setMovies(res.data.results));
  });
  return (
    <div className="-mt-40 text-white">
      <h2 className="mb-4">Trending Movies</h2>
      <Swiper slidesPerView={6} loop={true} autoplay={{ delay: 3000 }}>
        {movies?.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <div className="w-64 h-auto " style={{boxShadow: `0px 300px 200px 10
                0px rgba(0 , 0 , 0 , 100)`}}>
                <div className="flex gap-4 items-end p-3">
                  <img
                    className="rounded-xl"
                    src={movie.poster_path ?  `https://image.tmdb.org/t/p/original${movie.poster_path}` : `/public/moon.png`}
                  />
                  <div className="absolute p-4">
                    <h2>{movie.title}</h2>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
