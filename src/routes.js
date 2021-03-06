const express = require('express')
const multer = require('multer')

const multerConfig = require('./config/multer')

const routes = express.Router()

const BoxController = require('./controllers/BoxController')
const FileController = require('./controllers/FileController')

// Default route
routes.get('/', (req, res) => {
  return res.json({
    msg: 'Sucesso',
    body: request.body
  })
})

// Boxes
routes.get('/boxes', BoxController.all)
routes.get('/boxes/:id', BoxController.show)
routes.post('/boxes', BoxController.store)

// Files
routes.post(
  '/boxes/:id/files',
  multer(multerConfig).single('file'),
  FileController.store
)

module.exports = routes
