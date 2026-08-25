import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  const navigation = [
    ['Activities', '/activities'],
    ['Leaderboard', '/leaderboard'],
    ['Teams', '/teams'],
    ['Users', '/users'],
    ['Workouts', '/workouts'],
  ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/activities" aria-label="OctoFit home"><span className="brand-mark">O</span><span>OctoFit</span></NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(([label, path]) => <NavLink key={path} to={path} end className={({ isActive }) => isActive ? 'active' : undefined}>{label}</NavLink>)}
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
      <footer className="app-footer">OctoFit Tracker <span>•</span> Keep moving together</footer>
    </div>
  )
}

export default App
