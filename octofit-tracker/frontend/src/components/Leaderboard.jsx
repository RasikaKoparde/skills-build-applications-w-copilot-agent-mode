import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('leaderboard').then(setLeaders).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><span className="eyebrow">Team momentum</span><h1>Leaderboard</h1></div><span className="count-badge">{leaders.length} ranked</span></div>
      {error ? <p className="alert alert-danger">{error}</p> : leaders.length === 0 ? <p className="empty-state">Rankings will appear after the first activity.</p> : <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Rank</th><th>Member</th><th>Points</th><th>Streak</th></tr></thead><tbody>{leaders.map((leader, index) => <tr key={leader._id ?? leader.id ?? index}><td>#{leader.rank ?? index + 1}</td><td>{leader.name ?? leader.username ?? 'Member'}</td><td>{leader.points ?? leader.score ?? 0}</td><td>{leader.streak ? `${leader.streak} days` : '—'}</td></tr>)}</tbody></table></div>}
    </section>
  )
}

export default Leaderboard
