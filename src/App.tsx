import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { useRole } from "./context/role";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import SessionBuilder from "./pages/SessionBuilder";
import Calendar from "./pages/Calendar";
import Squads from "./pages/Squads";
import SquadOverview from "./pages/SquadOverview";
import PlayerProfile from "./pages/PlayerProfile";
import Messages from "./pages/Messages";
import MyDay from "./pages/athlete/MyDay";
import MySessions from "./pages/athlete/MySessions";
import MyCalendar from "./pages/athlete/MyCalendar";
import Inbox from "./pages/athlete/Inbox";

function CoachRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="squads" element={<Squads />} />
      <Route path="squads/:id" element={<SquadOverview />} />
      <Route path="players/:id" element={<PlayerProfile />} />
      <Route path="library" element={<Library />} />
      <Route path="sessions" element={<SessionBuilder />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="messages" element={<Messages />} />
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}

function AthleteRoutes() {
  return (
    <Routes>
      <Route index element={<MyDay />} />
      <Route path="sessions" element={<MySessions />} />
      <Route path="calendar" element={<MyCalendar />} />
      <Route path="library" element={<Library />} />
      <Route path="inbox" element={<Inbox />} />
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  );
}

function AppShell() {
  const { role } = useRole();
  return <Layout>{role === "coach" ? <CoachRoutes /> : <AthleteRoutes />}</Layout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app/*" element={<AppShell />} />
    </Routes>
  );
}
