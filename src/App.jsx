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
    <div className=" font-sans w-full">
        <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
    </QueryClientProvider>
      </div>
  );
}

export default App;
