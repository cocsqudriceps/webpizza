import React from 'react'

let socket = new WebSocket('ws://localhost:5000')

socket.onopen =  () => {
    alert('Соединение установлено')
    socket.send('Opened')
}
socket.onmessage = (event) => {
    let message = event.data

    let messageElem = document.createElement('div')
    messageElem.textContent = message
    document.getElementById('messages').prepend(messageElem)
}

export const Chat = () => {
    return (
        <div id='messages'>

        </div>
    )

}
