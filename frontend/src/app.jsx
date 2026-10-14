import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Assessment from "./pages/assessment";
import Analysis from "./pages/analysis";
import Recommendations from "./pages/recommendations";
import History from "./pages/history";
import Wellness from "./pages/wellness";
import Support from "./pages/support";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Chatbot from "./pages/chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route
          path="/recommendations"
          element={<Recommendations />}
        />
        <Route path="/history" element={<History />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/support" element={<Support />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;