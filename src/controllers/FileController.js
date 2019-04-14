const Box = require('../models/Box')
const File = require('../models/File')

class FileController {
  async store(req, res) {
    const {
      params: { id: boxId },
      file: reqFile
    } = req

    if (!reqFile || !reqFile.originalname || !reqFile.key) {
      res.status(422)
      return res.json({ error: 'Arquivo inválido' })
    }

    const box = await Box.findById(boxId)

    const file = await File.create({
      title: reqFile.originalname,
      path: reqFile.key
    })

    box.files.push(file)

    await box.save()

    req.io.sockets.in(box._id).emit('file', file)

    return res.json(file)
  }
}

module.exports = new FileController()
