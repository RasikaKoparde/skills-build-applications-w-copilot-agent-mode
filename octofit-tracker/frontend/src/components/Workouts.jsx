import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchItems('workouts', controller.signal).then(setWorkouts).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    }).finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return <section className="page-section"><div className="section-heading"><div><div className="eyebrow">Train with intent</div><h1>Workouts</h1></div><span className="count-badge">{workouts.length} plans</span></div>{loading ? <div className="empty-state" role="status">Loading workouts...</div> : error ? <div className="empty-state">Unable to load data: {error}</div> : workouts.length === 0 ? <div className="empty-state">No workouts available yet.</div> : <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Workout</th><th>Type</th><th>Difficulty</th><th>Duration</th></tr></thead><tbody>{workouts.map((workout, index) => <tr key={workout._id ?? workout.id ?? index}><td>{workout.name ?? workout.title ?? '-'}</td><td>{workout.type ?? '-'}</td><td>{workout.difficulty ?? '-'}</td><td>{workout.duration ?? '-'}</td></tr>)}</tbody></table></div>}</section>
}

export default Workouts