import express, { Application, Request, Response, } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import sendResponse from './app/utils/sendResponse'
import router from './app/routes'

const app: Application = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1', router)


app.get('/', (req: Request, res: Response) => {

  res.send({
    message: 'Welcome to the University Server'
  })
})

app.use(globalErrorHandler)
app.use(notFound)
app.use(sendResponse)




export default app
