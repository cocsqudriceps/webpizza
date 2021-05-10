import React, {useState} from 'react'
import LockIcon from '@material-ui/icons/LockOutlined'
import EmailIcon from '@material-ui/icons/EmailOutlined'
import {useHttp} from "../hooks/http.hook";
import M from 'materialize-css'

export const LoginCard = () => {
    const {loading, request} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div id='loginCard' className='indigo darken-2'>
            <div className='input-field'>
                <EmailIcon className='prefix'/>
                <input name='email' className='validate' type='text' autoComplete='off' placeholder='Email'
                       onChange={changeHandler}/>
            </div>
            <div className='input-field'>
                <LockIcon className='prefix'/>
                <input name='password' className='validate' type='password' placeholder='Password'
                       onChange={changeHandler}/>
            </div>
            <button id='loginBtn' className='btn orange darken-3' type='submit' onClick={loginHandler}
                    disabled={loading}>Login
            </button>
        </div>
    )

}
