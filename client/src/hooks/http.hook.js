import { useCallback, useState } from 'react'
import 'regenerator-runtime/runtime'

export const useHttp = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		setLoading(true)

		if (body) {
			body = JSON.stringify(body)
			headers['Content-Type'] = 'application/json'
		}
		const response = await fetch(url, { method, body, headers })
		const data = await response.json()

		setLoading(false)

		if (!response.ok) {
			if (data.errors)
				data.errors.map(elem => {
					return setError(elem.msg)
				})
			return setError(data.message)
		}

		return data
	}, [])

	const clearError = useCallback(() => setError(null), [])


	return { loading, request, error, clearError }
}
