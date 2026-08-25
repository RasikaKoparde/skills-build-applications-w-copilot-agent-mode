import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchItems('teams', controller.signal).then(setTeams).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    }).finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return <section className="page-section"><div className="section-heading"><div><div className="eyebrow">Find your crew</div><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div>{loading ? <div className="empty-state" role="status">Loading teams...</div> : error ? <div className="empty-state">Unable to load data: {error}</div> : teams.length === 0 ? <div className="empty-state">No teams available yet.</div> : <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Team</th><th>Members</th><th>Points</th></tr></thead><tbody>{teams.map((team, index) => <tr key={team._id ?? team.id ?? index}><td>{team.name ?? team.teamName ?? '-'}</td><td>{team.members?.length ?? team.memberCount ?? '-'}</td><td>{team.points ?? team.score ?? 0}</td></tr>)}</tbody></table></div>}</section>
}

export default Teams