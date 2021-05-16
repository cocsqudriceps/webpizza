import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import ws from 'ws'
import open from 'open'
import { indexRouter } from './routes/index.router'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json())
app.use('/', indexRouter)

const wsServer = new ws.Server({ noServer: true })
wsServer.on('connection', socket => {
	socket.on('message', message => {
		console.log(wsServer.clients)
		wsServer.clients.forEach(client => {
			client.send(message)
		})
	})
})


async function start() {
	try {
		await mongoose.connect(config.get('uri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		const server = app.listen(config.get('port'), () => {
			//open(`http://localhost:${config.get('port')}`, {app: {name: open.apps.chrome}})
		})
		server.on('upgrade', (request, socket, head) => {
			wsServer.handleUpgrade(request, socket, head, socket => {
				wsServer.emit('connection', socket, request)
			})
		})
	} catch (e) {
		console.error(e.message)
		process.exit(1)
	}
}

start()
