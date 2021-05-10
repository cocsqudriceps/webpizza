import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
	return (
		<nav>
			<div className='nav-wrapper'>
				<ul id='nav-mobile' className='right hide-on-med-and-down'>
					<li>
						<Link to='/login'>Войти</Link>
					</li>
					<li>
						<Link to='/register'>Зарегестрироваться</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}
