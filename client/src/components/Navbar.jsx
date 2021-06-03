import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import  AuthContext  from '../context/AuthContext'

export const Navbar = () => {
	const auth = useContext(AuthContext)
	if (auth.isAuthenticated)
		return (
			<nav>
				<div className='nav-wrapper'>
					<ul id='nav-mobile' className='right hide-on-med-and-down'>
						{auth.isAuthenticated && (
							<div>
								<li>
									<a href='/' onClick={auth.logout}>
										Выйти
									</a>
								</li>
							</div>
						)}
						{!auth.isAuthenticated && (
							<div>
								<li>
									<NavLink to='/login'>Войти</NavLink>
								</li>
								<li>
									<NavLink to='/register'>Зарегестрироваться</NavLink>
								</li>
							</div>
						)}
					</ul>
				</div>
			</nav>
		)
}
