import { createContext } from 'react'

export default createContext({
	token: null,
	login: null,
	logout: null,
	isAuthenticated: false
})