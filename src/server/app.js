import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'

import registerRoutes from '@/routes'

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || '3000'
const host = process.env.HOST || '0.0.0.0'
app.listen(port, host, () => {
    require('../lib/db');
    registerRoutes(app);
    console.log('▶▶▶▶▶▶▶▶▶▶ 👍 Server Listening On Port %s 👍 ◀◀◀◀◀◀◀◀◀◀', port);
})

export default app
