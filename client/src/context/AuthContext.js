import { createContext } from 'react'

export const AuthContext = createContext({
	token: null,
	login: null,
	logout: null,
	isAuthenticated: false
})