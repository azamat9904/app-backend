const { Schedule } = require('../models/Schedule');

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

        const createdSchedule = await Schedule.create({
            roomId: schedule.roomId,
            name: schedule.name,
            surname:  schedule.surname,
            middlename: schedule.middlename,
            startDate: schedule.startDate,
            endDate: schedule.endDate,
            price: schedule.price,
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
    } catch (err) {
        res.status(500).json({
            message:
                'Запрос завершился неудачно:' + e.message,
            status: 'error',
            result: null,
    })
        console.log(err)
    }
}

module.exports.addSchedule = addSchedule
module.exports.deleteSchedule = deleteSchedule

