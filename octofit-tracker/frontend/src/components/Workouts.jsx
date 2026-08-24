import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts').then(setWorkouts).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><span className="eyebrow">Train with purpose</span><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>
      {error ? <p className="alert alert-danger">{error}</p> : workouts.length === 0 ? <p className="empty-state">No workout plans have been published yet.</p> : <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Workout</th><th>Focus</th><th>Difficulty</th><th>Duration</th></tr></thead><tbody>{workouts.map((workout, index) => <tr key={workout._id ?? workout.id ?? index}><td>{workout.name ?? workout.title ?? 'Workout'}</td><td>{workout.focus ?? workout.category ?? 'General'}</td><td>{workout.difficulty ?? 'All levels'}</td><td>{workout.duration ? `${workout.duration} min` : '—'}</td></tr>)}</tbody></table></div>}
    </section>
  )
}

export default Workouts
