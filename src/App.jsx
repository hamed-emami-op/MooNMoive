import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./compponents/header/Navbar";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <div className="container font-sans md:w-full ">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
