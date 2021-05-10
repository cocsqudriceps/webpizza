import React from 'react'
import {LoginCard} from '../components/LoginCard'
import logo from '../../public/pizza.png'

export const LoginPage = () => {


    return (
        <div className='indigo darken-4' id='loginPage'>
            <img src={logo} alt='logo' width='200' height='auto'/>
            <LoginCard/>
            <div>
                <p className='inline indigo-text text-lighten-3'>Are you new to ReactPizza?</p>
                <a className='inline'>Sign Up</a>
            </div>
        </div>
    )
}
