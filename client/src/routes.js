import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

export const useRoutes = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<MainPage />
			</Route>
			<Route exact path='/login'>
				<LoginPage />
			</Route>
			<Route path='/register'>
				<RegisterPage />
			</Route>
		</Switch>
	)
}
