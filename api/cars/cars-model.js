const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id).first()
}

const create = async (body) => {
  const [id] = await db('cars').insert(body)
  return getById(id)
}

const isVinSame = async (vin) => {
  return db('cars').where('vin', vin).first()
}

module.exports = {
  getAll,
  getById,
  create,
  isVinSame
}
