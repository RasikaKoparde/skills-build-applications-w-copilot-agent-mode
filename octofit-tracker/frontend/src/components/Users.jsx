import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchItems('users', controller.signal).then(setUsers).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    })
    return () => controller.abort()
  }, [])

  return <section className="page-section"><div className="section-heading"><div><div className="eyebrow">Your community</div><h1>Users</h1></div><span className="count-badge">{users.length} members</span></div>{error ? <div className="empty-state">Unable to load data: {error}</div> : users.length === 0 ? <div className="empty-state">No users available yet.</div> : <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Name</th><th>Email</th><th>Team</th></tr></thead><tbody>{users.map((user, index) => <tr key={user._id ?? user.id ?? index}><td>{user.name ?? user.username ?? '-'}</td><td>{user.email ?? '-'}</td><td>{user.team ?? user.teamName ?? '-'}</td></tr>)}</tbody></table></div>}</section>
}

export default Users