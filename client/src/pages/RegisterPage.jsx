import React from 'react'
import { Link } from 'react-router-dom'
import { RegisterCard } from '../components/RegisterCard'

export default () => (
  <div className='indigo darken-4' id='authPage'>
    <RegisterCard />
    <div>
      <p className='inline indigo-text text-lighten-3'>
        Already have an account?
      </p>
      <Link to='/login' className='inline'>
        Sign In
      </Link>
    </div>
  </div>
)
