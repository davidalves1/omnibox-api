const Box = require('../models/Box')

class BoxController {
  async all(req, res) {
    const boxes = await Box.find({})

    return res.json(boxes)
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } } // -1 = ordena de forma decresente
    })

    return res.json(box)
  }

  async store(req, res) {
    const {
      body: {
        title
      }
    } = req

    if (!title) {
      res.status(422)
      return res.json({ error: 'É preciso informar um título' })
    }

    const box = await Box.create({ title })
    return res.json(box)
  }
}

module.exports = new BoxController()
