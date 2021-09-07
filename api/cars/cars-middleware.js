const Cars = require('./cars-model')

const checkCarId = async (req, res, next) => {
  const { id } = req.params
  try {
    const possibleCar = await Cars.getById(id)
    if(!possibleCar) {
      next({
        status: 404,
        message: `car with id ${id} is not found`
      })
    } else {
      req.car = req
      next()
    }
  } catch (err) {
  next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const error = {
    status: 400
  }
  const { vin, make, model, milage } = req.body

  if (!vin.trim()) {
    error.message = 'vin is missing'
  } else if(!make.trim()) {
    error.message = 'make is missing'
  } else if (!model.trim()) {
    error.message = 'model is missing'
  } else if (milage === undefined) {
    error.message = 'milage is missing'
  }

  if (error.message) {
    next(error)
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  return next()
}

const checkVinNumberUnique = (req, res, next) => {
  return next()
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
