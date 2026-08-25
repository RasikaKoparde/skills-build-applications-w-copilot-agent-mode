import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchItems('activities', controller.signal).then(setActivities).catch((requestError) => {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    }).finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return <DataPage eyebrow="Daily movement" title="Activities" items={activities} error={error} loading={loading} columns={['activity', 'user', 'duration', 'date']} />
}

function DataPage({ eyebrow, title, items, error, loading, columns }) {
  return (
    <section className="page-section">
      <div className="section-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1></div><span className="count-badge">{items.length} records</span></div>
      {loading ? <div className="empty-state" role="status">Loading activities...</div> : error ? <div className="empty-state">Unable to load data: {error}</div> : items.length === 0 ? <div className="empty-state">No records available yet.</div> : <div className="table-responsive"><table className="table align-middle"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{items.map((item, index) => <tr key={item._id ?? item.id ?? index}>{columns.map((column) => <td key={column}>{item[column] ?? (column === 'activity' ? item.name : item[column]) ?? '-'}</td>)}</tr>)}</tbody></table></div>}
    </section>
  )
}

export default Activities