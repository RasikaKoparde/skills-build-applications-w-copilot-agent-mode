import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('teams').then(setTeams).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><span className="eyebrow">Find your crew</span><h1>Teams</h1></div><span className="count-badge">{teams.length} active</span></div>
      {error ? <p className="alert alert-danger">{error}</p> : teams.length === 0 ? <p className="empty-state">No teams are available yet.</p> : <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Team</th><th>Captain</th><th>Members</th><th>Points</th></tr></thead><tbody>{teams.map((team, index) => <tr key={team._id ?? team.id ?? index}><td>{team.name ?? 'Unnamed team'}</td><td>{team.captain ?? team.owner ?? '—'}</td><td>{team.members?.length ?? team.memberCount ?? 0}</td><td>{team.points ?? team.score ?? 0}</td></tr>)}</tbody></table></div>}
    </section>
  )
}

export default Teams
