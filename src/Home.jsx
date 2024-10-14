import MovieSlider from "./compponents/MovieSlider/MovieSlider";
import ContinueWatching from "./compponents/Slidecomponent/ContinueWatching";


export default function Home() {
  return (
    <div className="container ">
      <MovieSlider />
      <ContinueWatching />
    </div>
  );
}
