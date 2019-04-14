const mongoose = require('mongoose')

const File = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  path: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

// Este tipo de campo não existe no banco de fato, mas sim apenas na resposta para a req
File.virtual('url').get(function() {
  const url = process.env.URL || 'http://localhost:3001'

  return `${url}/files/${encodeURIComponent(this.path)}`
})

module.exports = mongoose.model('File', File)
