const sequelizeDb = require('../models')
const Weather = sequelizeDb.Weather
const Op = sequelizeDb.Sequelize.Op

exports.create = (req, res) => {
  const { temperature, wind, description } = req.body

  Weather.create({ temperature, wind, description })
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      if (err.errors) {
        res.status(422).send({
          message: err.errors
        })
      } else {
        res.status(500).send({
          message: 'Algún error ha surgido al insertar el dato.'
        })
      }
    })
}
exports.findAll = (req, res) => {
  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (page - 1) * limit
  const whereStatement = {}

  for (const key in req.query) {
    if (req.query[key] !== '' && req.query[key] !== 'null' && key !== 'page' && key !== 'size') {
      whereStatement[key] = { [Op.substring]: req.query[key] }
    }
  }

  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {}

  Weather.findAndCountAll({
    where: condition,
    attributes: ['id', 'temperature', 'wind', 'description', 'createdAt', 'updatedAt'],
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      result.meta = {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page,
        size: limit
      }

      res.status(200).send(result)
    })
    .catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Weather.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(404).send({
          message: `No se puede encontrar el elemento con la id=${id}.`
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: 'Algún error ha surgido al recuperar la id=' + id
      })
    })
}
