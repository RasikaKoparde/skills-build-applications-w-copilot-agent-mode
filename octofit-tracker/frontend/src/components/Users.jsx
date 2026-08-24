import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((loadError) => setError(loadError.message))
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading">
        <div><span className="eyebrow">Community</span><h1>Members</h1></div>
        <span className="count-badge">{users.length} total</span>
      </div>
      {error ? <p className="alert alert-danger">{error}</p> : users.length === 0 ? <p className="empty-state">No members have joined yet.</p> : <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Name</th><th>Email</th><th>Team</th></tr></thead><tbody>{users.map((user, index) => <tr key={user._id ?? user.id ?? index}><td>{user.name ?? user.username ?? 'Unnamed member'}</td><td>{user.email ?? '—'}</td><td>{user.team ?? 'Unassigned'}</td></tr>)}</tbody></table></div>}
    </section>
  )
}

export default Users
