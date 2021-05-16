import React, { useCallback, useEffect, useRef, useState } from 'react'

export const Chat = () => {
	const [message, setMessage] = useState(null)
	let socket = useRef(null)

	useEffect(() => {
		socket.current = new WebSocket('ws://localhost:5000')
	}, [])

	useEffect(() => {
		socket.current.onmessage = event => {
			const elem = document.createElement('div')
			elem.id = 'chat-message'
			elem.textContent = event.data
			document.getElementById('messages-field').prepend(elem)
		}
	}, [])

	const messageHandler = () => {
		socket.current.send(message)
		console.log(message)
		setMessage('')
	}
	const changeHandler = event => {
		setMessage(event.target.value)
	}

	return (
		<div id='chat-container'>
			<div id='messages-field'/>
			<div id='new-message-field' className='grey'>
				<input id='chat-input' type='text' onChange={changeHandler} />
			</div>
			<a id='chat-send-btn' className='btn'><i className='material-icons' onClick={messageHandler}>send</i></a>
		</div>
	)
}
