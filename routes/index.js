const express = require('express')
const RoomController = require('../controllers/RoomController')
const ScheduleController = require('../controllers/ScheduleController')
const UserController = require('../controllers/UserController')
// const { verifyToken } = require('../middleware/auth')
const router = express.Router()

router.get('/rooms',  RoomController.getRooms)
router.post('/schedule',  ScheduleController.addSchedule)
router.put('/schedule',  ScheduleController.updateScheduleDate)
router.delete('/schedule/:id',  ScheduleController.deleteSchedule)

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports.router = router


