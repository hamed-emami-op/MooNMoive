import axios from "axios";
import { useQuery } from "react-query";
import Anime from "../../Pages/WarpMovie.jsx/Anime";
import Series from "../../Pages/WarpMovie.jsx/Series";
import Movie from "../../Pages/WarpMovie.jsx/Movie";
import Animtion from "../../Pages/WarpMovie.jsx/Animtion";

const fetchAnime = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=d52f00854ed915b688d5abec54bce588&with_genres=16&language=en-US&sort_by=popularity.desc`
  );
  return res.data.results;
};
const fetchSeries = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=d52f00854ed915b688d5abec54bce588&language=en-US&page=1`
  );
  return res.data.results;
};
const fetchMovies = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=d52f00854ed915b688d5abec54bce588&language=en-US&page=1`
  );
  return res.data.results;
};
const fetchAnimations = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=d52f00854ed915b688d5abec54bce588&with_genres=16&language=en-US&sort_by=popularity.desc`
  );
  return res.data.results;
};


export default function MovieSlider() {
  const { data: animeData, isLoading: animeLoading } = useQuery(
    "anime",
    fetchAnime
  );
  const { data: seriesData, isLoading: seriesLoading } = useQuery(
    "series",
    fetchSeries
  );
  const { data: movieData, isLoading: movieLoading } = useQuery(
    "movies",
    fetchMovies
  );
  const { data: animationData, isLoading: animationLoading } = useQuery(
    "animations",
    fetchAnimations
  );
  if (animeLoading || seriesLoading || movieLoading || animationLoading) {
    return <p>Loading...</p>;
  }
 
  return (
    <div className="relative w-full h-full bg-[#0f0e0e]">
      <Anime data={animeData} animeLoading={animeLoading} />
      <Movie data={movieData} movieLoading={movieLoading} />
      <Series data={seriesData} seriesLoading={seriesLoading} />
      <Animtion data={animationData} animationLoading={animationLoading} />
    </div>
  );
}
