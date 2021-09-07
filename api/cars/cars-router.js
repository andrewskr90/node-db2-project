const express = require('express')
const Car = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
  } = require('./cars-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const allCars = await Car.getAll()
        res.status(200).json(allCars)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, (err, req, res, next) => {
    if (req.car) {
        res.status(200).json(req.car)
    } else {
        next(err)
    }
})

router.post('/', checkCarPayload, (req, res, next) => {
    try {
        throw new Error()
    } catch (err) {
        next(err)
    }
})

module.exports = router
