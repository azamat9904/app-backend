const express = require('express')
const RoomController = require('../controllers/RoomController')
const ScheduleController = require('../controllers/ScheduleController')
const router = express.Router()

router.get('/rooms', RoomController.getRooms)
router.post('/schedule', ScheduleController.addSchedule)
router.delete('/schedule/:id', ScheduleController.deleteSchedule)

module.exports.router = router

