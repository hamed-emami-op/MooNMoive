import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./compponents/header/Navbar";
// import Footer from "./compponents/header/footer";
import AnimePages from "./Pages/AnimePages";
import MoviePages from "./Pages/MoviePages";
import SeriesPages from "./Pages/SeriesPages";
import AnimationPages from "./Pages/AnimtionPages";
import DetailsPage from "./Publick/DetailsPage";
import UserProvider from "./compponents/context/UserContext";
import Login from "./Pages/user/Login";
import { Toaster } from "react-hot-toast";
import Register from "./Pages/user/Register";
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
          <UserProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime" element={<AnimePages />} />
              <Route path="/movie" element={<MoviePages />} />
              <Route path="/series" element={<SeriesPages />} />
              <Route path="/animation" element={<AnimationPages />} />
              <Route
                path="/:data/details/:type/:id"
                element={<DetailsPage />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Register />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
            {/* <Footer /> */}
          </UserProvider>
        </Router>
      </QueryClientProvider>
      <Toaster />
    </div>
  );
}

export default App;
