import React from 'react'
import { RegisterCard } from '../components/RegisterCard'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
	return (
		<div className='indigo darken-4' id='authPage'>
			<RegisterCard/>
			<div>
				<p className='inline indigo-text text-lighten-3'>Already have an account?</p>
				<Link to='/login' className='inline'>Sign In</Link>
			</div>
		</div>
	)
}
