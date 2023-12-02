const { Room } = require('../models/Room')
const { NoBusinessDay } = require('../models/NoBusinessDay')
const { Schedule } = require('../models/Schedule');

const getRooms = async (req, res) => {
    try{
        const rooms = await Room.findAll({
            include: [NoBusinessDay, Schedule]
        })

        return res.json({
            status: true,
            message: "Запрос успешно выполнился",
            result: {
                rooms
            }
        })
    }catch(e){
        res.status(500).json({
            status: false,
            message: "Не удалось получить список комнат " + e.messaage,
            result: null
        })
        console.log(e)
    }
}


module.exports.getRooms = getRooms