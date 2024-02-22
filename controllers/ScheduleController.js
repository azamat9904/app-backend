const { Schedule } = require('../models/Schedule');
const { Room} = require("../models/Room");
const moment = require('moment')

const isScheduleBooked = (startDate, endDate, schedules) => {
    const newScheduleStartDate = moment(startDate)
    const newScheduleEndDate = moment(endDate)
    let isBooked = false

    schedules.forEach((foundRoomSchedule) => {
        const roomStartDate =  moment(foundRoomSchedule.dataValues.startDate)
        const roomEndDate = moment(foundRoomSchedule.dataValues.endDate)

        if(roomStartDate.isBetween(newScheduleStartDate, newScheduleEndDate) ||
            roomStartDate.isSame(newScheduleStartDate) || roomStartDate.isSame(newScheduleEndDate) ||
            roomEndDate.isBetween(newScheduleStartDate, newScheduleEndDate) ||
            roomEndDate.isSame(newScheduleStartDate) || roomEndDate.isSame(newScheduleEndDate)
        ){
            isBooked =  true
        }

        if(newScheduleStartDate.isBetween(roomStartDate, roomEndDate) ||
            newScheduleStartDate.isSame(roomStartDate) || newScheduleStartDate.isSame(roomEndDate) ||
            newScheduleEndDate.isBetween(roomStartDate, roomEndDate) ||
            newScheduleEndDate.isSame(roomStartDate) || newScheduleEndDate.isSame(roomEndDate)
        ){
            isBooked =  true
        }
    })


    return isBooked
}

const addSchedule = async (req, res) => {
    try {
        const schedule = req.body
        const bodyKeys = ['roomId', 'name', 'surname', 'middlename', 'startDate', 'endDate', 'price']

        if(!bodyKeys.every(key => Object.keys(schedule).includes(key))){
            return res.status(400).json({
                status: false,
                message: 'Один из ключей отсутствует ' + bodyKeys.join(','),
                result: null,
            })
        }

        const rooms = await Room.findAll({
            include: [Schedule],
            where: {
                id: schedule.roomId
            }
        })

        const foundRoomSchedules = rooms && Array.isArray(rooms) ? rooms[0].dataValues.Schedules : []

        let isBooked = isScheduleBooked(schedule.startDate, schedule.endDate, foundRoomSchedules)

        if(isBooked){
            return res.status(403).json({
                status: false,
                message: 'Уже есть запись на эту дату',
                result: null
            })
        }

        const createdSchedule = await Schedule.create({
            roomId: schedule.roomId,
            name: schedule.name,
            surname:  schedule.surname,
            middlename: schedule.middlename,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            price: schedule.price,
            comment: schedule.comment || ''
        })

        res.status(201).json({
            status: true,
            message: 'Запрос успешно отработал',
            result: {
                schedule: {
                    ...createdSchedule.dataValues
                },
            },
        })
    } catch (e) {
        res.status(500).json({
            status: false,
            message:
                'Запрос завершился неудачно:' + e.message,
            result: null,
        })
        console.log(e)
    }
}

 const deleteSchedule = async (req, res) => {
    try {
        const id = req.params.id

        await Schedule.destroy({
            where: {
                id: id,
            },
        })

        res.status(201).json({
            message: 'Расписание успешно удалено',
            status: 'success',
            result: {
                scheduleId: id,
            },
        })
    } catch (e) {
        res.status(500).json({
            message:
                'Запрос завершился неудачно:' + e.message,
            status: 'error',
            result: null,
    })
        console.log(err)
    }
}

const updateScheduleDate = async (req, res) => {
    try {
        const reqBody = req.body
        const schedule = await Schedule.findOne({
            where: {
                id: reqBody.id
            },
        })

        if (!schedule) {
            return res.status(404).json({
                message: 'Нет расписания с таким id',
                status: 'error',
                result: null,
            })
        }

        let roomId = reqBody.roomId || schedule.dataValues.roomId

        const rooms = await Room.findAll({
            include: [Schedule],
            where: {
                id: roomId
            }
        })

        let foundRoomSchedules = rooms && Array.isArray(rooms) ? rooms[0].dataValues.Schedules : []

        foundRoomSchedules = foundRoomSchedules.filter(schedule => schedule.id !== reqBody.id)

        let isBooked = isScheduleBooked(reqBody.startDate, reqBody.endDate, foundRoomSchedules)

        if(isBooked){
            return res.status(403).json({
                status: false,
                message: 'Уже есть запись на эту дату',
                result: null
            })
        }

        const payload = {}
        const scheduleKeys = Object.keys(schedule.dataValues)
        const reqBodyEntries = Object.entries(reqBody)

        for(let [key, value] of reqBodyEntries)
            if(scheduleKeys.includes(key))
                payload[key] = value

        schedule.set(payload)
        await schedule.save()

        res.status(201).json({
            message: 'Запрос успешно отработал',
            status: 'success',
            result: {
                schedule:   {
                    ...schedule.dataValues
                },
            },
        })
    } catch (err) {
        res.status(500).json({
            message:
                'Запрос завершился неудачно:' + err.message,
            result: null,
        })
        console.log(err)
    }
}

module.exports.addSchedule = addSchedule
module.exports.deleteSchedule = deleteSchedule
module.exports.updateScheduleDate = updateScheduleDate