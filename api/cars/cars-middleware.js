const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  const { id } = req.params
  try {
    let possibleCar = await Cars.getById(id)
    if(!possibleCar) {
      console.log('no car', id)
      next({
        status: 404,
        message: `car with id ${id} is not found`
      })
    } else {
        req.car = possibleCar
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
  const { vin, make, model, mileage } = req.body

  if (!vin) {
    error.message = 'vin is missing'
  } else if(!make) {
    error.message = 'make is missing'
  } else if (!model) {
    error.message = 'model is missing'
  } else if (typeof mileage !== 'number') {
    error.message = 'mileage is missing'
  }

  if (error.message) {
    console.log(error)
    next(error)
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  let isValidVin = vinValidator.validate(req.body.vin)
  if (isValidVin === false) {
    let error = {
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    }
    next(error)
  } else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  Cars.isVinSame(req.body.vin)
    .then(vin => {
      if(vin) {
        let error = {
          status:400,
          message: `vin ${req.body.vin} already exists`
        }
        next(error)
      } else {
        next()
      }
      // vins.map(vin => {
      //   if(vin === req.body.vin) {
      //     console.log('it exists')
      //     let error = {
      //       status:400,
      //       message: `vin ${req.body.vin} already exists`
           // next(error)
    // }
      })
      .catch(next)
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
