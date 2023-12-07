const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('mysql://root:h5GGbac6dBh44cHFfEc-EbDCFeCagFf6@monorail.proxy.rlwy.net:23385/railway')


module.exports.sequelize = sequelize