import axios from "axios";
import { useQuery } from "react-query";
import TrendingMoviesSlider from "../Slidecomponent/TrendingMoviesSlider";
import MovieSliderHeader from "../Slidecomponent/MovieSliderHeader";

export default function MovieSlider() {
  const { data, isLoading, isError, error } = useQuery("api-tmdb", async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=d52f00854ed915b688d5abec54bce588&with_genres=16&sort_by=popularity.desc`
    );
    return res.data.results;
  });
  return (
    <div className="">
      <MovieSliderHeader movies={{ data, isLoading, isError, error }} />
      <TrendingMoviesSlider movies={{ data, isLoading, isError, error }} />
    </div>
  );
}
// discover
// &with_genres=16&sort_by=popularity.desc
