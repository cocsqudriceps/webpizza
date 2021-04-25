import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import authRoutes from './routes/auth.routes'

process.env['NODE_CONFIG_DIR'] = './config'

const app = express()

app.use('/api/auth', authRoutes)

async function start() {
	try {
		await mongoose.connect(config.get('uri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		app.listen(config.get('serverPort'), () => {})
	} catch (e) {
		console.error(e.message)
		process.exit(1)
	}
}

start()
