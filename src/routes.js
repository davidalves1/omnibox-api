const express = require('express')
const multer = require('multer')

const multerConfig = require('./config/multer')

const routes = express.Router()

const BoxController = require('./controllers/BoxController')
const FileController = require('./controllers/FileController')

// Default route
routes.get('/', (req, res) => {
  return res.json({msg: "It work"})
})

// Boxes
routes.get('/boxes', BoxController.all)
routes.get('/boxes/:id', BoxController.show)
routes.post('/boxes', BoxController.store)

// Files
routes.get('/boxes/:id/files', FileController.all)
routes.post(
  '/boxes/:id/files',
  multer(multerConfig).single('file'),
  FileController.store
)

module.exports = routes
