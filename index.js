import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'

import { notFound, errorHandler } from './middleware/error.js'
import connectDatabase from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

// database connect
connectDatabase()

const app = express()

// logger for development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

/** applying necessary middlewares */
app.use(express.json())

/** routes */
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

/** status - whether the APIs is running or not */
app.get('/', (req, res) => {
  res.json({
    message: 'APIs is running...',
    status: res.statusCode,
  })
})

/** error handling middleware */
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
