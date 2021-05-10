import express from 'express'
import path from 'path'
import { Router } from 'express'
import {authRouter} from './auth.routes.js'

export const indexRouter = Router()

indexRouter.use('/api/auth/', authRouter)
indexRouter.use(express.static(path.resolve(__dirname, '../../../dist/client')))
indexRouter.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../../dist/client/index.html'))
})

