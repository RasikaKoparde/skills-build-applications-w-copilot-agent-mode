const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiUrl = (component) => `${apiOrigin}/api/${component}/`

export const responseItems = (payload) => {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['data', 'results', 'items', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
  }

  return []
}

export const fetchItems = async (component, signal) => {
  const response = await fetch(apiUrl(component), { signal })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return responseItems(await response.json())
}