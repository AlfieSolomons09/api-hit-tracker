import express from 'express'
import bodyParser from 'body-parser'
import apiRoutes from './routes/api.js'

import cors from 'cors'

const app = express()
const PORT = 4000

app.use(cors())


app.use(bodyParser.json())
app.use('/api', apiRoutes)


app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`)
})