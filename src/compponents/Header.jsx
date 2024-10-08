import MovieSlider from "./header/MovieSlider";

import TrendingMoviesSlider from "./header/Slidecomponent/TrendingMoviesSlider";

export default function Header() {
  return (
    <header className="container w-full h-auto">
      <MovieSlider />
      <TrendingMoviesSlider />
    </header>
  );
}
