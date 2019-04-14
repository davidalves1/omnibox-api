const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const path = require('path')

const routes = require('./routes')

const app = express()
app.use(cors())

// Informa que será possível utilizar na aplicação
// tanto o protocolo HTTP quanto WS (Web Socket - realtime)
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('Conectado com WS')
  // Utiliza "salas" diferentes para a conexão de cada box
  // dessa forma cada box fica isolada e não recebe informações
  // de outras boxes
  socket.on('connectRoom', box => {
    socket.join(box)
  })
})

mongoose.connect(
  'mongodb://user:admin123@ds137596.mlab.com:37596/omnibox',
  { useNewUrlParser: true }
)

// Cria uma variável "io" dentro do "req" disponível em toda apliação
app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Diz que quando for informada a rota abaixo é para servir os estáricos descritos na rota
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(routes)

const port = process.env.PORT || 3001

server.listen(port, console.log(`Lintening on port ${port}`))
