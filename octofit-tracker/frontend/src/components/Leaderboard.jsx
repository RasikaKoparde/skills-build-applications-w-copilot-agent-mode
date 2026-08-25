import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchItems('leaderboard', controller.signal).then(setEntries).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    }).finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return <section className="page-section"><div className="section-heading"><div><div className="eyebrow">Team challenge</div><h1>Leaderboard</h1></div><span className="count-badge">{entries.length} ranked</span></div>{loading ? <div className="empty-state" role="status">Loading leaderboard...</div> : error ? <div className="empty-state">Unable to load data: {error}</div> : entries.length === 0 ? <div className="empty-state">No rankings available yet.</div> : <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Rank</th><th>Member</th><th>Team</th><th>Points</th></tr></thead><tbody>{entries.map((entry, index) => <tr key={entry._id ?? entry.id ?? index}><td>{entry.rank ?? index + 1}</td><td>{entry.user ?? entry.username ?? entry.name ?? '-'}</td><td>{entry.team ?? entry.teamName ?? '-'}</td><td>{entry.points ?? entry.score ?? 0}</td></tr>)}</tbody></table></div>}</section>
}

export default Leaderboard