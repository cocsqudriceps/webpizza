import { useCallback, useState } from 'react'
import 'regenerator-runtime/runtime'

export default () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(
    async (url, method = 'GET', bdy = null, header = {}) => {
      setLoading(true)

      const headers = header
      let body = bdy

      if (body) {
        body = JSON.stringify(bdy)
        headers['Content-Type'] = 'application/json'
      }
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()

      setLoading(false)

      if (!response.ok) {
        if (data.errors) data.errors.map(elem => setError(elem.msg))
        return setError(data.message)
      }

      return data
    },
    []
  )

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}
