import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import SessionBuilder from "./pages/SessionBuilder";
import Calendar from "./pages/Calendar";
import Squads from "./pages/Squads";
import Players from "./pages/Players";
import PlayerProfile from "./pages/PlayerProfile";
import AthleteView from "./pages/AthleteView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/app/*"
        element={
          <Layout>
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="library" element={<Library />} />
              <Route path="sessions" element={<SessionBuilder />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="squads" element={<Squads />} />
              <Route path="players" element={<Players />} />
              <Route path="players/:id" element={<PlayerProfile />} />
              <Route path="athlete" element={<AthleteView />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
