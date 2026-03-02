import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Problems from "./pages/allProblems";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reviews from "./pages/Reviews";
function App() {

  return (

    <Router>

      <Routes>
        {/* REGISTER PAGE */}
        <Route path="/" element={<Register />} />

        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

         

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <div className="min-h-screen bg-[#FDF9F0] font-sans text-gray-900">

              {/* Background glow */}
              <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-yellow-100/50 via-transparent to-transparent"></div>

              <div className="relative z-10">
                <Navbar />
                <HeroSection />
              </div>

            </div>
          }
        />

        {/* PROBLEMS PAGE */}
        <Route
          path="/problems"
          element={
            <div className="min-h-screen bg-[#FDF9F0]">
              <Navbar />
              <Problems />
            </div>
          }
        />
      <Route path="/reviews" element={<Reviews />} />
      </Routes>

    </Router>

  );

}

export default App;