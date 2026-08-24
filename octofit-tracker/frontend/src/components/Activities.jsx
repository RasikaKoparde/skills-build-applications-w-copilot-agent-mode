import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><span className="eyebrow">Movement log</span><h1>Activities</h1></div><span className="count-badge">{activities.length} recorded</span></div>
      {error ? <p className="alert alert-danger">{error}</p> : activities.length === 0 ? <p className="empty-state">No activities have been recorded yet.</p> : <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Activity</th><th>Member</th><th>Duration</th><th>Date</th></tr></thead><tbody>{activities.map((activity, index) => <tr key={activity._id ?? activity.id ?? index}><td>{activity.type ?? activity.name ?? 'Activity'}</td><td>{activity.user ?? activity.username ?? 'Unknown member'}</td><td>{activity.duration ? `${activity.duration} min` : '—'}</td><td>{activity.date ?? activity.createdAt ?? '—'}</td></tr>)}</tbody></table></div>}
    </section>
  )
}

export default Activities
