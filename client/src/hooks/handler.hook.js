import { useContext, useEffect, useState } from 'react'
import useMessage from './message.hook'
import useHttp from './http.hook'
import AuthContext from '../context/AuthContext'

export default url => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, request, error, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    message(error, 'red')
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const authHandler = async () => {
    const data = await request(url, 'POST', { ...form })
    if (url === '/api/auth/login') auth.login(data.token)
    else message(data.message, 'green')
  }

  return { changeHandler, authHandler, loading }
}
