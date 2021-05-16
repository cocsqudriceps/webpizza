import { useCallback, useEffect, useState } from 'react'

export const useAuth = () => {
	const [token, setToken] = useState(null)

	const login = useCallback(jwt => {
		setToken(jwt)
		localStorage.setItem('authData', JSON.stringify({jwt}))
	}, [])
	const logout = useCallback(() => {
		setToken(null)
		localStorage.removeItem('authData')
	}, [])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('authData'))
		if (data && data.jwt) {
			login(data.jwt)
		}
	}, [login])

	return { login, logout, token }
}