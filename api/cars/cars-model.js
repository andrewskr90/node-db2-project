const db = require('../../data/db-config')

const getAll = async () => {
  await db('cars')
}

const getById = async (id) => {
  const result = await db('cars').where('id', id).first()
  return result
}

const create = async (body) => {
  const [id] = await db('cars').insert(body)
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  create
}
