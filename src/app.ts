import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.routes'
const app: Application = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1/users', UserRoutes) //application  routes
app.use('/api/v1/students', StudentRoutes) //application  routes

app.get('/', (req: Request, res: Response) => {

  res.send({
    message: 'Welcome to the University Server'
  })
})

export default app
