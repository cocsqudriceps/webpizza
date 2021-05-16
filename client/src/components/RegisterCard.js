import EmailIcon from '@material-ui/icons/EmailOutlined'
import ContactsIcon from '@material-ui/icons/ContactsOutlined'
import LockIcon from '@material-ui/icons/LockOutlined'
import React from 'react'
import { useHandler } from '../hooks/handler.hook'

export const RegisterCard = () => {
	const { authHandler, changeHandler, loading } = useHandler('/api/auth/register')

	return (
		<div id='registerCard' className='indigo darken-2'>
			<div className='input-field'>
				<ContactsIcon className='prefix' />
				<input name='FirstName' className='validate' type='text' autoComplete='off' placeholder='FirstName'
							 onChange={changeHandler} />
			</div>
			<div className='input-field'>
				<ContactsIcon className='prefix' />
				<input name='LastName' className='validate' type='text' autoComplete='off' placeholder='LastName'
							 onChange={changeHandler} />
			</div>
			<div className='input-field'>
				<EmailIcon className='prefix' />
				<input name='email' className='validate' type='text' autoComplete='off' placeholder='Email'
							 onChange={changeHandler} />
			</div>
			<div className='input-field'>
				<LockIcon className='prefix' />
				<input name='password' className='validate' type='password' placeholder='Password'
							 onChange={changeHandler} />
			</div>
			<button id='loginBtn' className='btn orange darken-3' type='submit' onClick={authHandler}
							disabled={loading}>Register
			</button>
		</div>
	)
}