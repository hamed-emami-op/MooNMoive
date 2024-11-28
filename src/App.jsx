import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./compponents/header/Navbar";
// import Footer from "./compponents/header/footer";s
import AnimePages from "./Pages/AnimePages";
import MoviePages from "./Pages/MoviePages";
import SeriesPages from "./Pages/SeriesPages";
import AnimationPages from "./Pages/AnimtionPages";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <div className=" font-sans w-full bg-[#0f0e0e]">
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime" element={<AnimePages />} />
            <Route path="/movie" element={<MoviePages />} />
            <Route path="/series" element={<SeriesPages />} />
            <Route path="/animation" element={<AnimationPages />} /> 
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
