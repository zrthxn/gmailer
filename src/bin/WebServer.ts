// Show a GUI for all handling
// Provide APIs

import path from 'path'
import multer from 'multer'

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import handlebars from 'express-handlebars'
import { conf } from '../lib/conf'

export const AUTHDIR = path.resolve(__dirname, '../../auth')

const app = express()
const multipart = multer()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../../views'))

app.engine('hbs', 
  handlebars({
    defaultLayout: 'index',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, '../../views/layouts'),
    partialsDir: path.join(__dirname, '../../views'),
  })
)

app.use('static', express.static(path.resolve(__dirname, '../../views/static')))

app.use(cookieParser(process.env.AUTH_KEY))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(multipart.array()) 

app.listen(3000, () => {
  console.log(conf.Green('GMailMan available at http://localhost:3000'))
})