import React from 'react'

export const ChatMessage = props => {
	const date = new Date()
	if (props.value.isMine)
		return (
			<div id='chat-message'>
				<div id='you-message'>{props.value.message}</div>
				<div id='message-time'>{`${date.getHours()}:${date.getMinutes()}`}</div>
			</div>
		)
	return (
		<div id='other-chat-message'>
			<div id='other-message'>{props.value.message}</div>
			<div id='message-time'>{`${date.getHours()}:${date.getMinutes()}`}</div>
		</div>
	)
}
