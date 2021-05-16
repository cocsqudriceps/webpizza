import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { MainPage } from '../pages/MainPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'

export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route exact path='/'>
					<MainPage />
				</Route>
				<Redirect to="/" />
			</Switch>
		)
	}
	return (
		<Switch>
			<Route exact path='/login'>
				<LoginPage />
			</Route>
			<Route exact path='/register'>
				<RegisterPage />
			</Route>
			<Redirect to="/login" />
		</Switch>
	)
}