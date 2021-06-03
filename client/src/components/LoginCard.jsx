import React from 'react'
import LockIcon from '@material-ui/icons/LockOutlined'
import EmailIcon from '@material-ui/icons/EmailOutlined'
import useHandler from '../hooks/handler.hook'

export const LoginCard = () => {
	const { authHandler, changeHandler, loading } = useHandler('/api/auth/login')

	return (
		<div id='loginCard' className='indigo darken-2'>
			<div className='input-field'>
				<EmailIcon className='prefix' />
				<input
					name='email'
					className='validate'
					type='text'
					autoComplete='off'
					placeholder='Email'
					onChange={changeHandler}
				/>
			</div>
			<div className='input-field'>
				<LockIcon className='prefix' />
				<input
					name='password'
					className='validate'
					type='password'
					placeholder='Password'
					onChange={changeHandler}
				/>
			</div>
			<button
				id='loginBtn'
				className='btn orange darken-3'
				type='submit'
				onClick={authHandler}
				disabled={loading}
			>
				Login
			</button>
		</div>
	)

}
