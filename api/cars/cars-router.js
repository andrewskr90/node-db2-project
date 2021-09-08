const express = require('express')
const Car = require('./cars-model')
const md = require('./cars-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const allCars = await Car.getAll()
        console.log(allCars)
        res.status(200).json(allCars)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', md.checkCarId, (req, res, next) => {
    if (req.car) {
        res.status(200).json(req.car)
    } else {
        next(err)
    }
})

router.post('/', md.checkCarPayload, md.checkVinNumberValid, md.checkVinNumberUnique, async (req, res, next) => {
    try {
        let newCar = await Car.create(req.body)
        res.status(201).json(newCar)
    } catch (err) {
        next(err)
    }
})

module.exports = router
