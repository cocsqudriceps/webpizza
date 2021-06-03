import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatMessage } from './ChatMessage'
import  AuthContext  from '../context/AuthContext'

export const Chat = () => {
	const [message, setMessage] = useState(null)
	const { token } = useContext(AuthContext)
	const [list, setList] = useState([])
	let socket = useRef(null)

	useEffect(() => {
		socket.current = new WebSocket(`ws://localhost:5000/?token=${token}`)
	}, [])

	useEffect(() => {
		socket.current.onmessage = event => {
			const value = JSON.parse(event.data)
			value.isMine = token === value.token
			setList(list.concat(<ChatMessage key={Date.now()} value={value} />))
		}
	}, [list])

	const messageHandler = () => {
		socket.current.send(JSON.stringify({ message, token }))
		document.getElementById('chat-field').value = ''
		setMessage('')
	}
	const changeHandler = event => {
		setMessage(event.target.value)
	}

	return (
		<div id='chat-container'>
			<div id='chat-title'>
				<p>Chat</p>
			</div>
			<div id='chat-message-list'>{list}</div>
			<div id='chat-form'>
				<button
					className='btn btn-floating waves-effect'
					disabled={!message}
					onClick={messageHandler}
				>
					<i className='material-icons'>send</i>
				</button>
				<input
					id='chat-field'
					type='text'
					placeholder='Send a message'
					onChange={changeHandler}
				/>
			</div>
		</div>
	)
}
