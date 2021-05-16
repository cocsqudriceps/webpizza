import { useAuth } from './hooks/auth.hook'
import { useRoutes } from './hooks/routes.hook'
import { AuthContext } from './context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'

export const App = () => {
	const {token, login, logout} = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)

	return (
		<AuthContext.Provider value={{token, login, logout, isAuthenticated}}>
			<Router>
				<div>
					{routes}
				</div>
			</Router>
		</AuthContext.Provider>
	)
}