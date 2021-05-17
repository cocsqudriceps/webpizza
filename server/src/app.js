import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import bodyParser from 'body-parser'
import ws from 'ws'
import { indexRouter } from './routes/index.router'
import open from 'open'
import url from 'url'
import jwt from 'jsonwebtoken'

const app = express()

app.use(bodyParser.json())
app.use('/', indexRouter)

const wsServer = new ws.Server({ noServer: true })

wsServer.on('connection', socket => {
	socket.on('message', message => {
		wsServer.clients.forEach(client => {
			client.send(message)
		})
	})
})

function validateJwt(address) {
	try {
		jwt.verify(address, config.get('jwt'))
		return true
	} catch (e) {
		return false
	}
}

async function start() {
	try {
		await mongoose.connect(config.get('uri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		const server = app.listen(config.get('port'), () => {
			//open(`http://localhost:${config.get('port')}`, {app: {name: open.apps.chrome}})
		})

		server.on('upgrade', (request, socket, head) => {
			const queryObject = url.parse(request.url, true).query
			if (validateJwt(queryObject.token)) {
				wsServer.handleUpgrade(request, socket, head, socket => {
					wsServer.emit('connection', socket, request)
				})
			} else {
				socket.write(
					'HTTP/1.1 401 Web Socket Protocol Handshake\r\n' +
						'Upgrade: WebSocket\r\n' +
						'Connection: Upgrade\r\n' +
						'\r\n'
				)
				socket.destroy()
			}
		})
	} catch (e) {
		console.error(e.message)
		process.exit(1)
	}
}

start()
