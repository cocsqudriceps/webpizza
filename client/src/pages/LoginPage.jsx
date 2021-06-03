import React from 'react'
import { LoginCard } from '../components/LoginCard'
import logo from '../../public/pizza.png'
import { Link } from 'react-router-dom'

export default () => (
  <div className='indigo darken-4' id='authPage'>
    <img src={logo} alt='logo' width='200' height='auto' />
    <LoginCard />
    <div>
      <p className='inline indigo-text text-lighten-3'>
        Are you new to ReactPizza?
      </p>
      <Link to='/register' className='inline'>
        Sign Up
      </Link>
    </div>
  </div>
)
